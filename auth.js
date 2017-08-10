const apiHost = 'api.testtp.thingbine.com';
const baseUri = 'https://' + apiHost + '/v2/';
module.exports = {
    thingPlus: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        apiHost: apiHost,
        accessTokenUri: '/v2/oauth2/token',
        redirectUri: function (appAddress) {
            return 'http://' + appAddress + '/callback'
        },
        baseUri: baseUri,
        authorizationUri: baseUri + 'oauth2/authorize',        
        gatewaysUri: baseUri + 'gateways',
        userUri: baseUri + 'users/me',
        signupUri: 'https://thingplus.net/signup/',
        scopes: [
            "user-profile",
            "user-profile-read",
            "gateway",
            "gateway-read",
            "gateway-update",
            "timeline-read",
            "tag",
            "tag-read",
            "rule",
            "rule-read",
            "service-read",
            "site-read",
            "billing-read"
        ]
    }
}