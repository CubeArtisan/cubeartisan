ARG REPOSITORY=ghcr.io/cubeartisan
ARG TAG=latest
FROM $REPOSITORY/cubeartisan-jobs:$TAG

ENV NODE_ENV=production
RUN yarn build
# RUN yarn install --frozen-lockfile --production=true || yarn install --frozen-lockfile --production=true || yarn install --frozen-lockfile --production=true; yarn cache clean

ENTRYPOINT sh -c 'yarn server'
