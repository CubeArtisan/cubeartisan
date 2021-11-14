# CubeArtisan

[![Continuous Integration Checks](https://github.com/CubeArtisan/cubeartisan/actions/workflows/actions.yml/badge.svg)](https://github.com/CubeArtisan/cubeartisan/actions/workflows/actions.yml)

An open source web application for building, managing, and playtesting Magic the Gathering cubes with a focus on 
powerful tooling.

### Contributing

If you are interested in contributing towards CubeArtisan, please read the [Contribution guidelines for this project](CONTRIBUTING.md).

# Setup

### Install Prerequisites

You will need to install NodeJS 16.10, Yarn and MongoDB 4.4.10. You can find the necessary resources here:

NodeJS: https://nodejs.org/en/download/

Once NodeJS is installed you can install yarn with

```sh
npm install -g yarn
```

MongoDB: https://docs.mongodb.com/manual/installation/

You will need to either start MongoDB background process, or manually start and stop the process in
a separate console. Refer to the official documentation for directions on how to set this up for
your OS. Optionally, you can also run MongoDB using docker

```sh
docker run --name cubeartisan-mongodb -p 27017:27017 -d mongo:4.4.10```


You must setup a replicaset named rs0 (or a different name if you adjust it in .env). See the MongoDB
docs for how to set this up.

### Initial Setup

Clone the project into a folder of your choice. Copy `.env_EXAMPLE` to `.env` and fill out your personal tokens.
**NOTE** Blank variables can be left blank. The defaults should work if you don't want to fill out anything.

Once your `.env` file is filled out, run the following commands in the root of the cloned repository:

```sh
yarn install
yarn cards                  # This will bundle modules and download Scryfall assets.
```

If you are on Windows, you will need to set bash as your script shell first:
You will need to make sure you have `bash` installed somewhere and run the following command
[with your `bash` path in place of the path below as needed].

```sh
yarn config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
````

Then you can start the development server like so:

```sh
yarn start
```

You can now open up a browser and connect to the app through: http://127.0.0.1:8080. Despite the fact that node says
it is running on port 5000, you should use port 8080 to connect since we want to talk to the webpack
dev server.

Nodemon will restart the application anytime there is a change to a source file.

### Running tests

To run the test suite, run `yarn test`.

If you make changes to `updatecards.js` or other code that will require remaking the fixture files in `fixtures/`
you can use the helper: `cd server && node scripts/update_fixtures.js` after getting the lastest card info using
`yarn cards`. This will retain the same cards in the fixtures but with updated card details and fixture files.

### Updating Card Definitions

The card definitions are cached locally for quick access. This definition is pulled from scryfall every 24 hours
normally, but you can force an update with the command:
```sh
yarn cards
```

### Adding Analytics

To build the analytics database objects, you need to run the script `populate_analytics.js`. You will likely need to
add the `max-old-space-size` flag like so:
```sh
node --max-old-space-size=8192 server/jobs/populate_analytics.js
```

This will populate the data used for card pages. You will need to do a couple playtest drafts to seed some data for the
analytics for this to work correctly.

## Deploying to Kubernetes

The github actions automatically build the docker image and deploy `dev` to the staging environment. To setup an
environment you'll need to copy the `staging` folder and update the values for your environment. This requires `kubectl`
to be setup with the credentials for the cluster and `kustomize` to be accessible on your path. You will also have to
create the following secrets:

 - The image pull secrets called `github-docker` in the namespace you are going to deploy to. Refer to the kubernetes
   docs for how to create this using a github access token.
 - The mongodb user password. This is in a secret called `mongodb-password` in the namespace with the mongo server.
   See the mongodb community kubernetes operator docs for more information.
 - The CubeArtisan secrets called `cubeartisansecrets` with the keys specified in
   `.docker/k8s/per_env/40-cubeartisan.kube.yaml`, again in the namespace you will deploy to.
    - It will automatically use the mongodb password you set so you don't need an entry for it here.
    - You will need to retrieve the elasticsearch and apm secrets as documented in the ECK documentation.
   
There are also some requirements for the cluster as a whole. Currently, the configuration assumes Google Kubernetes
Engine. This should not be very difficult to change as needed though. If you are setting up a new cluster you will need
to install the Elastic Cloud on Kubernetes (ECK) operator in the cluster. We've tested with version 1.6 in production.
You also need to install the MongoDB Community Kubernetes Operator following their docs. I highly advise giving it its
own namespace and having it watch all namespaces, so you can have multiple environments. If setting up global cluster
configuration you can apply it to your cluster with `kubectl apply -f .docker/k8s/global`. If you are deploying all
environments you should use `kustomize build .docker/k8s | kubectl apply -f -` to apply the configurations for all
environments at once as well as the global config.

To setup or update just one environment you only need to run `kustomize build .docker/k8s/<env> | kubectl apply -f -`
replacing `<env>` with the path to the environment you are deploying.

To access kibana you will need 
