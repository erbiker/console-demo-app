This project is a basic implementation of a permissions management system.

It is built with Prisma/SQLite and Next.js.

## Getting Started

First, install the dependencies:

```zsh
pnpm install
```

Then, run the the setup script to seed the database:

```zsh
pnpm run setup
```

Then you can run the project:

```zsh
pnpm dev
```

Open the browser to [http://localhost:3000](http://localhost:3000)

Given the SQLite database is hosted within the project, deploying to a serverless platform is not recommended (you will be unable to persist data). Running locally works great – which is the point here.

## Approach

### Stack

- Next.js
- Prisma + SQLite
- shadcn/ui

Next/Prisma was chose to be as quick as possible to get a full-stack app up and running without needing to create and manage multiple services.

shadcn-ui is a library I am familiar with and while it's possible a more pre-confiugred component library like material-ui or next-ui would have been slightly faster,

### Shortcuts/Todos:

Primarily, the UI is pretty basic. In a lot of places where it might make sense to add additional buttons, navigation, dialogs, tooltips, etc., we've opted to skip them for time and just have simple pages that are single-purpose.

Other shortcuts:

- [ ] Add pagination to data tables
  - In this demo, we're just going to assume we have a manageable amount of data

## Access Policy Structure
