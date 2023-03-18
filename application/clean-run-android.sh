#!/bin/zsh
watchman watch-del-all
watchman shutdown-server
./android/gradlew clean
npx react-native run-android
