#!/bin/bash

rsync -rp --delete --quiet $TRAVIS_BUILD_DIR/node_modules $SSH_USER@$HOST:$DEV_PATH/backend/. || exit 29
ssh $SSH_USER@$HOST mkdir -p $DEV_PATH/backend/db || exit 29
rsync -rp --delete --quiet $TRAVIS_BUILD_DIR/migrations $SSH_USER@$HOST:$DEV_PATH/backend/db/. || exit 29
rsync -rp --delete --quiet $TRAVIS_BUILD_DIR/seeds $SSH_USER@$HOST:$DEV_PATH/backend/db/. || exit 29
rsync -rp --delete --quiet $TRAVIS_BUILD_DIR/knexfile.ts $SSH_USER@$HOST:$DEV_PATH/backend/db/. || exit 29
rsync -rp --delete --quiet $TRAVIS_BUILD_DIR/dist/* $SSH_USER@$HOST:$DEV_PATH/backend/. || exit 29