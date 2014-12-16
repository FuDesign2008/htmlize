#!/bin/bash


if [ ! -d "node_modules" ]
then
    echo "to intall nodejs packages..."
    npm install
    echo "to intall nodejs packages... done"
fi

echo "building plainize ..."
grunt
echo "building done"

