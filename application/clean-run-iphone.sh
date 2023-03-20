#!/bin/zsh
xattr -w com.apple.xcode.CreatedByBuildSystem true /Users/leogaudin/Documents/Repositories/track-and-trace/application/ios/build
cd ios
xcodebuild clean
cd ../
npx react-native run-ios --device "iPhone"
