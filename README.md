Learning React Native CRUD with SQLite


## Table of Contents
* [Built With](#built-with)
* [Generating Signed APK](#generating-signed-apk)



## Built With ##
[^](#table-of-contents)   



## Getting started

### Starting   

[^](#table-of-contents)   



---



## Generating Signed APK ##
Please notes, I was use Windows so mostly all commands are for windows   


### Generating a signing key   
Android requires that all apps be digitally signed with a certificate before they can be installed, so to distribute your Android application via Google Play store, you'll need to generate a signed release APK. The Signing Your Applications page on Android Developers documentation describes the topic in detail. This guide covers the process in brief, as well as lists the steps required to package the JavaScript bundle.   
   
Run below command to prompts you for passwords for the keystore and key and for the Distinguished Name fields for your key. It then generates the keystore as a file called `my-release-key.keystore`.   

```cmd
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

The keystore contains a single key, valid for 10000 days. The alias is a name that you will use later when signing your app, so remember to take note of the alias.   



### Setting up gradle variables   
* Place the `my-release-key.keystore` file under the `android/app` directory in your project folder.
* Edit the file `android/gradle.properties`, and add the following (replace ***** with the correct keystore password, alias and key password)

```js
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```   



### Adding signing config to your app's gradle config
Edit the file `android/app/build.gradle` in your project folder, and add the signing config
```js
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```



### Generating the release APK
Run the following in command
```cmd
cd android
```
```cmd
gradlew assembleRelease
```
Gradle's assembleRelease will bundle all the JavaScript needed to run your app into the APK.   
The generated APK can be found under `android/app/build/outputs/apk/release/app-release.apk`, and is ready to be distributed.   


Please visit [React Native](https://facebook.github.io/react-native/docs/signed-apk-android)'s site to read their generating APK documentations if you macOS. Also, mostly I was just copy-paste their documentations.   
[^](#table-of-contents)   



---



## Notes ##

### I Will update README later if I didn't forgot

