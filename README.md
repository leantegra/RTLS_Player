# Leantegra RTLS player

This tool allow you to play different sequences of coordinates and compare them.

The RTLS player works fully inside Docker and keep node_modules inside Docker image as well. No need to run `npm i` to install modules locally.


## Useful commands

```
docker-compose up
docker-compose up --build
docker-compose build
docker-compose exec player bash

docker-compose -f docker-compose.prod.yml up -d,
docker-compose -f docker-compose.prod.yml logs
```

Please add new npm modules inside container only:

```
docker-compose exec player yarn add my-module
```