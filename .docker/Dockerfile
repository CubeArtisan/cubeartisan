FROM node:16

WORKDIR /CubeArtisan
RUN mkdir client server
COPY ./package.json ./
COPY ./server/package.json server/package.json
COPY ./client/package.json client/package.json
COPY ./yarn.lock ./
COPY ./.yarnrc.yml ./
ENV NODE_ENV=development
RUN yarn install

COPY ./server/babel.config.cjs server/babel.config.cjs
COPY ./server/config   server/config/
COPY ./server/emails   server/emails/
COPY ./server/models   server/models/
COPY ./server/public   server/public/
COPY ./server/routes   server/routes/
COPY ./server/scripts  server/scripts/
COPY ./server/serverjs server/serverjs/
COPY ./server/views    server/views/

COPY ./client/babel.config.cjs   client/babel.config.cjs
COPY ./client/webpack.common.cjs client/webpack.common.cjs
COPY ./client/webpack.prod.cjs   client/webpack.prod.cjs
COPY ./client/analytics  client/analytics/
COPY ./client/components client/components/
COPY ./client/drafting   client/drafting/
COPY ./client/filtering  client/filtering/
COPY ./client/hooks      client/hooks/
COPY ./client/layouts    client/layouts/
COPY ./client/markdown   client/markdown/
COPY ./client/nearley    client/nearley/
COPY ./client/pages      client/pages/
COPY ./client/proptypes  client/proptypes/
COPY ./client/res        client/res/
COPY ./client/utils      client/utils/

ENV NODE_ENV=production
ENV DEBUG=false
RUN yarn build
RUN yarn upgrade

ENTRYPOINT sh -c 'yarn cards && node --experimental-loader @node-loader/babel routes/index.js'