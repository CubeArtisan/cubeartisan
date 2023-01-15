FROM node:18.12.1

LABEL org.containers.image.url=https://github.com/CubeArtisan/cubeartisan

ENV DEBUG=false
ENV NODE_ENV=production

RUN corepack enable

RUN apt update && apt install -y gawk

WORKDIR /CubeArtisan

COPY ./package.json              package.json
COPY ./pnpm-lock.yaml            pnpm-lock.yaml
COPY ./tsconfig.json             ./tsconfig.json
COPY ./vite.config.ts            ./vite.config.ts
COPY ./src/                      ./src
COPY ./public/                   ./public

RUN NODE_ENV=development pnpm install --frozen-lockfile && \
    NODE_ENV=production  pnpm build && \
    rm -r node_modules/ && \
    NODE_ENV=production  pnpm install -P --frozen-lockfile && \
    pnpm store prune

ENTRYPOINT node dist/server.js
