#!/bin/zsh
if [[ "$@" == *"watchman"* ]]; then
    watchman watch-del-all
    watchman shutdown-server
fi

if [[ "$@" == *"clean"* ]]; then
    ./android/gradlew clean
fi

npx react-native run-android
