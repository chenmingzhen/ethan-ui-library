#!/usr/bin/env bash

cd publish/

server_ip="193.112.175.198"
project_path="/ethan"

files=$(ls)
for file_name in $files
do
    scp -r "$file_name" root@$server_ip:"$project_path"
done

ssh root@$server_ip "exit"
