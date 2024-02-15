#!/bin/zsh
watchman watch-del-all
watchman shutdown-server
cd android
./gradlew --stop
./gradlew clean
./gradlew bundleRelease
open app/build/outputs/bundle/release/
