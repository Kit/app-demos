# Example OAuth Express Server

> This directory contains an example express server for demonstrating authenticating with Kit with OAuth for use in the V4 API.

## Usage

1. First you must create your app inside the Kit Developer Settings. If developing locally, you can create the app in the main Kit repository.

2. Then configure API Access:

        Authorization URL: https://localhost:8080/oauth/kit
             Redirect URI: https://localhost:8080/oauth/kit/callback

3. After cloning this repository, create an `.env` file and add the client ID and secret ID from the Developer Settings. Set the KIT_SERVER if needed:

        KIT_OAUTH_CLIENT_ID="FILL ME IN"
        KIT_OAUTH_CLIENT_SECRET="FILL ME IN"
        KIT_SERVER=ck.lol

4. Install dependencies

        npm install

5. Generate TLS certificate

        mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1

    Place cert in `example.com.pem` & `example.com-key.pem`

6. Start server

        npm start

        > oauth-express@1.0.0 start
        > node --env-file .env index.js

        Kit OAuth Configuration {
          authorizationURL: 'https://app.kit.com/oauth/authorize',
          tokenURL: 'https://app.kit.com/oauth/token',
          clientID: '*******************************************',
          clientSecret: '*******************************************',
          callbackURL: 'https://localhost:8080/oauth/kit/callback'
        }
        Listening on :8080

7. From here, clicking the "Install" button in the App Store will initiate the OAuth flow by first going to your configured Authorization URL
