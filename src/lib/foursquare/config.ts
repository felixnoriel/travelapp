const defaultConfig = {
    apiUrl: 'https://api.foursquare.com/v2',
    version: '20171001',
    locale: 'en'
}
const buildCreds = function(config: any){
    const creds = {
        'v': '20171001',
        'client_id': config.FOURSQUARE_CLIENT_ID,
        'client_secret': config.FOURSQUARE_CLIENT_SECRET
    };
    return creds;
}


export default (settings: any) => {
    const config = Object.assign({}, defaultConfig, settings);
    config.credentials = buildCreds(config);
    return config;
}
