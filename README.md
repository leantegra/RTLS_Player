# Leantegra RTLS player

This tool enables playing different sequences of RTLS coordinates for comparison, testing and algorithm research.

The RTLS player works fully inside Docker and keeps node_modules inside Docker image as well. No need to run `npm i` to install the modules locally.

The node process inside Docker container is run using `node` user (uid=guid=1000), so if you bind volumes to container all files created inside container will be owned by the user with uid=1000 on your host.

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