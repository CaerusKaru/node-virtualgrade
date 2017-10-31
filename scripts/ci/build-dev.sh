#!/bin/bash

rsync -rp --delete --quiet $TRAVIS_BUILD_DIR/node_modules $SSH_USER@$HOST:$DEV_PATH/backend/. || exit 29
rsync -rp --delete --quiet $TRAVIS_BUILD_DIR/dist/* $SSH_USER@$HOST:$DEV_PATH/backend/. || exit 29