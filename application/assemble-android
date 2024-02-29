#!/bin/zsh
watchman watch-del-all
watchman shutdown-server
cd android
./gradlew --stop
./gradlew clean
./gradlew assembleRelease
open app/build/outputs/apk/release/
