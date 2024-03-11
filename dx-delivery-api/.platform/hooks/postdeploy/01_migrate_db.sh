#!/bin/bash

cd /var/app/current
# debugging..
ls -lah

export NODE_TLS_REJECT_UNAUTHORIZED=0
yarn migrate_db
