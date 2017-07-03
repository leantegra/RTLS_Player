# Leantegra RTLS player

This tool allow you to play different sequences of coordinates and compare them.

The RTLS player works fully inside Docker and keep node_modules inside Docker image as well. No need to run `npm i` to install modules locally.

Inside docker container node process is run using `node` user (uid=guid=1000), so if you bind volumes to container all files created inside container will be owned by user with uid=1000 on your host.

## Useful commands

```
docker-compose up
docker-compose up --build
docker-compose build
docker-compose exec --user=node player bash
./bin/player_shell
docker-compose -f docker-compose.prod.yml up -d,
docker-compose -f docker-compose.prod.yml logs
```

Please add new npm modules inside container only:

```
./bin/player_shell yarn add my-module
```

## TODO
- Add session meta (length, device count, geojson rect etc)