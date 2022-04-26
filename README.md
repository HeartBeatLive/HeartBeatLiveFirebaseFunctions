# HeartBeatLive Firebase Functions
This repository collect all cloud functions, that should be deployed to Firebase project.

## Implemented triggers
1. *userCreatedHandler* -- handle user creation from Firebase Authentication and send new user data to the server.
2. *userDeletedHandler* -- handle user deletion from Firebase Authentication and send this info to the server.

## Set up
- Set up environment properties. Use `/functions/.env` file for configuring them localy or Firebase Console for configurating them on Firebase server. See [Configuration properties](#configuration-properties) to understand how you should configure your properties.
- For running in emulator:
    1. Create `.firebaserc` file in root folder. Here an example content:
        ```json
        {
            "projects": {
                "default": "heartbeat-c8956"
            },
            "emulators": {
                "ui": {
                    "enabled": true,
                    "port": 4000
                },
                    "auth": {
                    "port": "9099"
                }
            }
        }
        ```
    2. Run `npm -prefix functions run build` command in project folder.
    3. Run `firebase emulators:start` command in project folder to start firebase emulator (you need to download it previously, check Firebase documentation).
- For deploying to the Firebase servers:
    1. Run `firebase deploy --only functions` in project folder.

## Configuration properties
### `GRAPHQL_ENDPOINT`
Endpoint on which functions should make a requests. \
Example: `http://localhost:8080/graphql`

### `GRAPHQL_ENDPOINT_TOKEN`
Secret token for authenticating on server (this is not a user bearer token, this is separate static token for Cloud Functions). \
Example: `simple-firebase-function-token`