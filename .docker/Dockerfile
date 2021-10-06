ARG REPOSITORY=ghcr.io/cubeartisan
ARG TAG=latest
FROM $REPOSITORY/cubeartisan-jobs:$TAG

RUN yarn build

ENTRYPOINT sh -c 'yarn server'
