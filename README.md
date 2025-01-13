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

Other items to consider:

- [ ] Add pagination to data tables

  - In this demo, we're just going to assume we have a manageable amount of data

- [ ] Allow more complex access lengths

  - We could allow for custom lengths, or selecting an access expiration date

- [ ] Allow re-ordering of approval or provisioning steps

  - Right now, the user's only option is to delete and re-add the step

- [ ] Allow for approvals to be assigned to a Group rather than just Users

  - Some ux research would be needed to see if this is desired or how it would be implemented (would one User in the group need to approve, or would we specify a number of users that need to approve?)

- [ ] More advanced deletion logic

  - Right now, we're fully deleting records from the database, rather than using a soft delete. In addtion, when we delete, we're not checking if any live policies need to be updated, or showing any warnings (for example, if we delete an approval from a live policy and there are no longer any approvers, we should probably show a warning).

- [ ] More advanced policy validation logic

  - We're doing some validation on publish, but we're not locking the policy after publish so there is the posiblity to edit the policy into a bad state while it is live.

## Access Policy Structure
