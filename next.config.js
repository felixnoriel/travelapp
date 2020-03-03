require('dotenv').config();
const process = require('process');
// const path = require('path');
// const appConfig = Object.assign({}, require(path.join(__dirname, 'config', process.env.APP_ENV || 'development')));

const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

const {
    COGNITO_USER_POOL_ID,
    COGNITO_REGION,
    COGNITO_APP_CLIENT_ID,
    MAPBOX_PUBLIC_API_KEY,
    MAPBOX_DEV_API_KEY,
    REST_API_URL,
    COGNITO_REDIRECT_SIGNIN,
    COGNITO_REDIRECT_SIGNOUT,
    COGNITO_DOMAIN,
    FOURSQUARE_CLIENT_ID,
    FOURSQUARE_CLIENT_SECRET
} = process.env;

const nextConfig = {
    env: {
        COGNITO_USER_POOL_ID,
        COGNITO_REGION,
        COGNITO_APP_CLIENT_ID,
        MAPBOX_PUBLIC_API_KEY,
        MAPBOX_DEV_API_KEY,
        REST_API_URL,
        COGNITO_REDIRECT_SIGNIN,
        COGNITO_REDIRECT_SIGNOUT,
        COGNITO_DOMAIN,
        FOURSQUARE_CLIENT_ID,
        FOURSQUARE_CLIENT_SECRET
    },
};

module.exports = withSass(withCss(nextConfig));
