This project is a basic implementation of a permissions management system.

It is built with Prisma/SQLite and Next.js.

## Getting Started

First, install the dependencies:

```zsh
pnpm install
```

Then, run the database migrations:

```zsh
pnpm prisma migrate dev
```

Then you can run the project:

```zsh
pnpm dev
```

Open the browser to [http://localhost:3000](http://localhost:3000)

Given the SQLite database is hosted within the project, deploying to a serverless platform is not recommended (you will be unable to persist data). Running locally works great – which is the point here.
