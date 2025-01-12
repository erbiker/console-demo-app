/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { prompt } from 'enquirer';
import apps from '../mock_data/apps.json';
import groups from '../mock_data/groups.json';
import users from '../mock_data/users.json';

const prisma = new PrismaClient();

async function checkExistingData() {
  try {
    // Check if database file exists
    const dbExists = !execSync('test -f prisma/dev.db || echo "missing"', {
      encoding: 'utf8',
    }).includes('missing');

    if (!dbExists) {
      return false;
    }

    // Try to count records - this will fail if db exists but isn't migrated
    try {
      const userCount = await prisma.user.count();
      const groupCount = await prisma.userGroup.count();
      const appCount = await prisma.app.count();

      return userCount > 0 || groupCount > 0 || appCount > 0;
    } catch (error) {
      // If we get here, db exists but probably isn't migrated
      return false;
    }
  } catch (error) {
    // If anything goes wrong, assume no data exists
    return false;
  }
}

async function clearDatabase() {
  await prisma.$disconnect();

  try {
    execSync('rm -f prisma/dev.db', { stdio: 'inherit' });
    console.log('🗑️  Database file deleted');
  } catch (error) {
    console.error('Failed to delete database file:', error);
  }

  const newPrisma = new PrismaClient();
  Object.assign(prisma, newPrisma);
}

async function seedDatabase() {
  // First create users
  const createdUsers = await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          title: user.title,
          department: user.department,
        },
      }),
    ),
  );

  // Create groups
  const createdGroups = await Promise.all(
    groups.map((group) =>
      prisma.userGroup.create({
        data: {
          name: group.name,
          description: group.description,
        },
      }),
    ),
  );

  // Create apps (using the first user as owner for all apps)
  const defaultOwner = createdUsers[0];
  const createdApps = await Promise.all(
    apps.map((app) =>
      prisma.app.create({
        data: {
          name: app.name,
          url: app.url,
          logo: app.logo,
          ownerId: defaultOwner.id,
        },
      }),
    ),
  );

  console.log(`✅ Created ${createdUsers.length} users`);
  console.log(`✅ Created ${createdGroups.length} groups`);
  console.log(`✅ Created ${createdApps.length} apps`);
}

async function main() {
  console.log('🔄 Checking database...');

  const hasExistingData = await checkExistingData();

  if (hasExistingData) {
    const response = await prompt<{ confirm: boolean }>({
      type: 'confirm',
      name: 'confirm',
      message: 'Database already contains data. Do you want to overwrite it?',
    });

    if (!response.confirm) {
      console.log('❌ Setup cancelled');
      process.exit(0);
    }

    console.log('🗑️  Clearing existing data...');
    await clearDatabase();
  }

  console.log('🔄 Running database migrations...');
  execSync('pnpm prisma migrate dev', { stdio: 'inherit' });

  console.log('🌱 Seeding database...');
  await seedDatabase();

  console.log('✅ Setup complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during setup:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
