#!/bin/bash

rsync -rp --delete --quiet $TRAVIS_BUILD_DIR $SSH_USER@$HOST:$PROD_PATH/backend/. || exit 29