# CubeArtisan

An open source web application for building, managing, and playtesting Magic the
Gathering cubes with a focus on powerful tooling.

[![Continuous Integration Checks](https://github.com/CubeArtisan/cubeartisan/actions/workflows/actions.yml/badge.svg)](https://github.com/CubeArtisan/cubeartisan/actions/workflows/actions.yml)

### Contributing

If you are interested in contributing towards CubeArtisan, please read the
[Contribution guidelines for this project](CONTRIBUTING.md).

## Setup

There are two ways to run the site. First through Docker which only requires you
have Docker installed, but is harder to develop in. The second requires more local
installations but is faster to iterate on.

### Docker

The first is to build and run the Docker image. This can be accomplished simply with the command
```bash
docker-compose -f .docker/docker-compose.yml up
```
Once you run that it'll start pulling down images and building the local code.
Once it is built you will be able to access the site at https://localhost:3000/
You will also be able to access the MongoDB server it is using at
mongodb://127.0.0.1:28017/cubeartisan?replicaSet=rs0 and a copy of the MtgML
server at http://localhost:8001.

This method is actually quite similar to how we run the production site. For
more on that you can see https://github.com/CubeArtisan/cubeartisan-infrastructure

### Local Development

If you are wanting to develop you probably want to run these on your local machine.
For that you will need to install NodeJS (only version we officially support is 18)
and MongoDB (any version 4.4 or newer should work) with a replica set named rs0 (see
the official documentation for how to set this up). We use the pnpm package manager
for node, but the best way to maintain that is through the new Corepack tool in
node. You should be able to enable it with `corepack enable`.

Then you probably want to setup reasonable defaults for the required environment
variables. You can do this by making a copy of `.env_EXAMPLE` named `.env`. You can
make any customizations to this you want, but the defaults should work just fine.

Now you just need to install all the dependencies with

```bash
pnpm install --frozen-lockfile
```

Once those are done installing you can run a development server with

```bash
pnpm dev
```

The output of that command will give you the url to open the site in your browser.

## Automated Checks

### Linter

We use prettier and ESLint to maintain a consistent style and catch certain kinds
of bugs. You can check that the code passes all the lint checks with

```bash
pnpm lint
```

or if you want it to try to fix all issues it can automatically

```bash
pnpm lint-fix
```

### Type Checking

We want to make sure all of our code is as type safe as possible so we have a strict
TypeScript configuration. There are some libraries we use that cause type errors to
appear in the regular output so we have a program to ignore those by default. You can
run the type checker with

```bash
pnpm checktypes
```

### Testing

We currently do not have any automated tests, but when we add them you will be able
to run them with

```bash
pnpm test
```

## Continuous Integration

We run all the above checks on all commits to the repository and require that they
are always passing on the release branches of `dev` and `prod`. You can run all the CI
checks with

```bash
pnpm ci
```

For `dev` when commits are merged into the branch it runs tests and if they
succeed it triggers a build of a new Docker image for the staging site at
https://staging.cubeartisan.net/ This is our testing environment and always has
the latest completed features and bug fixes.

For `prod` much the same happens but instead of deploying to staging it creates a new
GitHub release and Git tag based on the [RELEASE_NOTES.md](RELEASE_NOTES.md) file in the repository.
That then triggers a deployment to the production environment https://cubeartisan.net/
which if successful triggers release announcements to be sent out.
