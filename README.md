# Vocabulary Builder

Vocabulary builder helps you to create your dynamic and multiple vocabulary list, improving your vocabulary in many languages.

# Setup

There are some config files that needs to be setup.

## Sentry

You must have `sentry.properties` in order to have Sentry errors tracking, place the file in the root of `ios` and `android` folders.
The properties are:

```
defaults.url=https://sentry.io/
defaults.org=ORGANIZATION
defaults.project=PROJECT_NAME
auth.token=TOKEN
```

## Google Firebase

You'll need to setup firebase project on google console firebase website, as soon as you have setup `ios` and `android` project, download the google service json/plist and place them on `config` folder, they might have the following names:

```
google-services.json (Android)
GooglService-Info.plist (iOS)
```

## Google Signin and Google Firebase Realtime Database

To store the data on google cloud services we need to have some extra setups.

Create `google.json` with the following properties.

```
{
  "signIn": {
    "issuer": "https://accounts.google.com",
    "scopes": ["openid", "profile"],
    "clientId": CLIENT_ID,
    "redirectUrl": "PROJECT_NAME:/oauthredirect"
  },
  "firebase": {
    "apiKey": API_KEY,
    "authDomain": AUTH_DOMAIN,
    "databaseURL": DATABASE_URL,
    "projectId": PROJECT_ID,
    "storageBucket": STORAGE_BUCKET,
    "messagingSenderId": MESSAGING_SENDER_ID,
    "appId": APP_ID,
    "measurementId": MEASUREMENT_ID
  }
}
```

The setup above needs to be configured as `Web apps` on Project settings (Go to `General/Your apps` section).

# Running

In order to run the project you need to have NodeJS 10+ and I recommend Yarn since all scripts were made for it.

* `yarn install`
* `yarn ios` (run in iOS simulator)
* `yarn expo` (run in Expo simulator)
