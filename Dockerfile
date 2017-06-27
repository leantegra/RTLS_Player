FROM node:7.7.1

EXPOSE 3000

# Create app directory
RUN mkdir -p /opt/rtls-player
WORKDIR /opt/rtls-player

# Install app dependencies when package.json is changed
COPY package.json yarn.lock ./
RUN yarn install

# Bundle app source and rebuild dist files
COPY . ./

RUN yarn build

CMD yarn start
