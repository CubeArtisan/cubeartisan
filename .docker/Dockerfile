FROM node:16.10

LABEL org.containers.image.url=https://github.com/CubeArtisan/cubeartisan

ENV DEBUG=false
ENV NODE_ENV=production

RUN curl -sSL https://sdk.cloud.google.com | bash
ENV PATH $PATH:/root/google-cloud-sdk/bin
RUN apt-get update && apt-get install -y gcc python3-dev python3-setuptools python3-pip
RUN pip3 uninstall crcmod; pip3 install --no-cache-dir -U crcmod

WORKDIR /CubeArtisan
RUN mkdir client server markdown jobs

COPY ./package.json              package.json
COPY ./server/package.json       server/package.json
COPY ./client/package.json       client/package.json
COPY ./markdown/package.json     markdown/package.json
COPY ./jobs/package.json         jobs/package.json
COPY ./yarn.lock                 yarn.lock
COPY ./.yarnrc.yml               .yarnrc.yml

RUN yarn install --frozen-lockfile --production=false || yarn install --frozen-lockfile --production=false || yarn install --frozen-lockfile --production=false; yarn cache clean

COPY ./client/babel.config.cjs   client/babel.config.cjs
COPY ./client/webpack.common.cjs client/webpack.common.cjs
COPY ./client/webpack.prod.cjs   client/webpack.prod.cjs
COPY ./client/components         client/components/
COPY ./client/drafting           client/drafting/
COPY ./client/filtering          client/filtering/
COPY ./client/hooks              client/hooks/
COPY ./client/nearley            client/nearley/
COPY ./client/pages              client/pages/
COPY ./client/proptypes          client/proptypes/
COPY ./client/res                client/res/
COPY ./client/theming            client/theming/
COPY ./client/utils              client/utils/

COPY ./markdown/index.js         markdown/index.js
COPY ./markdown/plugins          markdown/plugins/
COPY ./markdown/components       markdown/components/

RUN yarn build

COPY ./server/babel.config.cjs   server/babel.config.cjs
COPY ./server/config             server/config/
COPY ./server/emails             server/emails/
COPY ./server/models             server/models/
COPY ./server/public             server/public/
COPY ./server/routes             server/routes/
COPY ./server/scripts            server/scripts/
COPY ./server/serverjs           server/serverjs/
COPY ./server/views              server/views/

# RUN yarn install --frozen-lockfile --production=true || yarn install --frozen-lockfile --production=true || yarn install --frozen-lockfile --production=true; yarn cache clean
ENTRYPOINT sh -c 'yarn server'
