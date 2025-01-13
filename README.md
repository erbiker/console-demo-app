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

- [ ] Add management pages for provisioning providers and api calls

  - In this app, all providers and api calls are provided. This reflects the real world where we've likely build connectors for specific common providers. However, there would still need to be some individual configuration of things like authentication for each provider, and we'd also want to allow for the addition of custom providers and api calls for services we don't yet support out of the box.

## Access Policy Structure

This application allows us to create access policies – on the other end, users can request access to a resource via the policies. Policies are avaialbe to users based on the visibilty set in the policy.

When a user requests access, we'll create a AccessRequest – this will link to the policy and the requesting user. If approvals are required, we'll create an AccessRequestApproval. Once approved, the agent will continue to the provision steps as defined in the policy.

Policies are created as drafts and incomplete by default. They can be published once all the necessary information is provided. Draft policies are not visible to any users or the agent. Policies can be unpublished even after AccessRequests have been created. This is a good example of where the base approach of just cascading deletes would not be ideal – we like don't ever want to actually delete a policy once it has been used, and only use the deleted date to determine if it should be retrieved in the app.

## Provisioning actions

These are not defined in this application, though we could allow the addition of managing provisioning actions in the future. You can think of the provisioning providers and the actions as the integrations and specific api calls we can make.

On the provider level, we can define base level information like authentication that the agent will use when interfacting with that specific api.

On the api call level, we can define the specific request method, headers, body, and response.

It would be expected that the majority of the providers and api calls would be defined on our end, but we could allow for the addition of custom providers and api calls.

### Complexity Explosion

Implementing beyond the basics for the provisioning actions involves a lot of complexity, beyond the scope of this demo.

My initial approach and deisgn in the schema was a naive one where I just put a fixed definition for each api call. You could imagine that there might be templated values that those definitions are looking for in order to make the call on the right resource (like a user id for the specific user we're trying to grant access for). When creating a policy definition, we could then provide the values for those templated values (or where to get them from the request). However, to make that UX work, it becomes quite complex – you can't expect the person creating the policy to want to write some complicated json to define the templated values, if they even had the values to begin with.

In many of these steps, during the definition of the action we'd be needing to make live calls to the api of the providers themselves just to have the data we need to define the action.

For example, in our demo Okta provider, the two api calls we've defined are about adding and removing users from okta groups. In order to know what groups exist, we'd need to make a call to the Okta API to get the groups. Alternatively we could be syncing the groups to our own database.

However, if you then think a little further to the various providers, and the data that needs to be fetched, and how we fetch that, the data model becomes a lot more complex. At some level it feels like we're essentially building a IPaaS platform, and that's not trivial. Given that this app is a demo that won't actually be using any of these providers or api calls, we're going to leave that complexity alone.
