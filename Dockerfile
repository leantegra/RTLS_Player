FROM node:7.7.1

EXPOSE 3000

# https://github.com/yelp/dumb-init
# TODO: move to base node image
ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Create app directory
RUN mkdir -p /home/node/rtls-player
WORKDIR /home/node/rtls-player

# Install app dependencies when package.json is changed
COPY package.json yarn.lock ./
RUN yarn install

# Copy source code
COPY . ./

RUN yarn build

# chmod is required because node_modules mapped as volume in dev mode
RUN  chown -R node:node ./

USER node
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["node", "server"]

HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl -f http://localhost:3000/ || exit 1