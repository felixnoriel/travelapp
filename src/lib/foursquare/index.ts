import querystring from 'querystring';
import request from './request';
import buildConfig from './config'
import {
    FOURSQUARE_CLIENT_ID,
    FOURSQUARE_CLIENT_SECRET
} from '../../../config'

const foursquare = (config: any) => {
    const credentials = config.credentials;
    config = Object.assign(config, {
        apiFeature: '/venues'
    });

    return {
        categories: function(params: any) {
            var urlString = config.apiUrl + config.apiFeature + "/categories?" +
              querystring.stringify(credentials);
            return request(urlString);
        },
        explore: function(params: any) {
            var urlString = config.apiUrl + config.apiFeature + "/explore?" +
              querystring.stringify(params) + '&' +
              querystring.stringify(credentials);
            return request(urlString);
        },
        recommendations: function(params: any) {
            var urlString = config.apiUrl + "/search/recommendations?" +
              querystring.stringify(params) + '&' +
              querystring.stringify(credentials);
            return request(urlString);
        },
        trending: function(params: any) {
            var urlString = config.apiUrl + config.apiFeature + "/trending?" +
              querystring.stringify(params) + '&' +
              querystring.stringify(credentials);
            return request(urlString);
        },
        getVenues: function(params: any) {
            var urlString = config.apiUrl + config.apiFeature + "/search?" +
              querystring.stringify(params) + '&' +
              querystring.stringify(credentials);
            return request(urlString);
        },
        getVenue: function(params: any) {
            var urlString = config.apiUrl + config.apiFeature + "/" +
                params.venue_id + '?' +
                querystring.stringify(credentials);
            return request(urlString);
        },
        getVenuePhotos: function(params: any) {
            var urlString = config.apiUrl + config.apiFeature + "/" +
                params.venue_id + '/photos?' +
                querystring.stringify(credentials);
            return request(urlString);
        },
        getVenueTips: function(params: any) {
            var urlString = config.apiUrl + config.apiFeature + "/" +
                params.venue_id + '/tips?' +
                querystring.stringify(credentials);
            return request(urlString);
        },
        suggestCompletion: function(params: any) {
            var urlString = config.apiUrl + config.apiFeature + "/suggestcompletion?" +
              querystring.stringify(params) + '&' +
              querystring.stringify(credentials);
            return request(urlString);
        },
    };
};

const config = buildConfig({
    FOURSQUARE_CLIENT_ID,
    FOURSQUARE_CLIENT_SECRET
});
export default () => foursquare(config)