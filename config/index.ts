export const cognitoConfigAuth = {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: process.env.COGNITO_USER_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: process.env.COGNITO_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.COGNITO_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    oauth: {
        domain: process.env.COGNITO_DOMAIN,
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: process.env.COGNITO_REDIRECT_SIGNIN,
        redirectSignOut: process.env.COGNITO_REDIRECT_SIGNOUT,
        responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
};

export const MAPBOX_PUBLIC_API_KEY = process.env.MAPBOX_PUBLIC_API_KEY || '';
export const REST_API_URL = process.env.REST_API_URL || '';
