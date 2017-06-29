#!/bin/bash

# This file is used in development mode when we need to mount voulmes from host to container.
# The workaround will not work if you use userns_remap, because user will not be able to run su then.
echo "Fixing node_modules permissions for development mode"
chown -R node:node /opt/rtls-player
# run development server as node user
su node -s /bin/bash -c "yarn dev"
