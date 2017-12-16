# Simple NativeScript Angular Demo App  ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![Greenkeeper badge](https://badges.greenkeeper.io/holisticon/nativescript-ngx-demo.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/holisticon/nativescript-ngx-demo.svg?branch=master)](https://travis-ci.org/holisticon/nativescript-ngx-demo)
[![Build Status](https://jenkins.holisticon.de/buildStatus/icon?job=Public/nativescript-ngx-demo/master)](https://jenkins.holisticon.de/blue/organizations/jenkins/Public%2Fnativescript-ngx-demo/activity)
[![Maintainability](https://api.codeclimate.com/v1/badges/1fd77d4968885a80238e/maintainability)](https://codeclimate.com/github/holisticon/nativescript-ngx-demo/maintainability)

## development environment (mac-only!)

### setup

* Install node 6+
* (sudo) `npm install -g npm@3`
* (sudo) `npm install -g nativescript@3  --unsafe-perm`
* OS X only:
  * `sudo gem install xcodeproj`
  * `sudo gem install cocoapods`
  * `brew install xcproj`
* Install Android SDK `brew install android`
* Setup Android: `android update sdk --filter tools,platform-tools,android-23,build-tools-23.0.3,android-25,build-tools-25.0.2,extra-android-m2repository,extra-google-m2repository,extra-android-support --all --no-ui`

Prepare and setup dependencies:
```

npm run clean
```

### Development

For Android watch mode:
```
npm run watch-android
```

Deploy app on connected device:
```
npm run android-device
```

For iOS watch mode
```
npm run watch-ios
```

### Release

In order to sign the app add your Android Keystore and Apple Developer Provisioning Profiles:
```
KEYSTORE_PATH=<PATH_TO_MY_KEYSTORE>/android_keystore KEYSTORE_PASS=<MY_PASSWOR> npm run package
```

The iOS Profile settings can be set in `app/App_Resources/iOS/build.xcconfig`

### Troubleshooting

#### Pod Sandboxing error

When getting this error you have to disable sandbox-pod:
```
Installing pods...
Processing node_modules failed. Error: Command sandbox-pod failed with exit code 1 Error output:
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-plugins-0.4.2
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-search-0.1.0
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-stats-0.6.2
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-try-0.5.1
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-trunk-0.6.4
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-stats-0.5.3
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-trunk-0.6.1
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-trunk-0.6.0
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-try-0.4.5
[!] Unable to load a specification for the plugin /Library/Ruby/Gems/2.0.0/gems/cocoapods-try-0.4.4
/Library/Ruby/Gems/2.0.0/gems/cocoapods-0.39.0/lib/cocoapods/user_interface/error_report.rb:77:in ': Operation not permitted - git (Errno::EPERM) from /Library/Ruby/Gems/2.0.0/gems/cocoapods-0.39.0/lib/cocoapods/user_interface/error_report.rb:77:in'
from /Library/Ruby/Gems/2.0.0/gems/cocoapods-
```
**IMPORTANT:** NativeScript uses the `sandbox-pod` executable. This may prevent some pods from installing correctly. If you encounter such cases, you can switch to the regular `pod` executable:

1. Open the NativeScript CLI configuration file, usually located in `/usr/local/lib/node_modules/nativescript/config/config.json` or `~/.nvm/versions/node/v6.9.3/lib/node_modules/nativescript/config/config.json`.
2. Change the value of `USE_POD_SANDBOX` to `false`.

