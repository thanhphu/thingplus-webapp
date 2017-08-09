const apiHost = 'api.testtp.thingbine.com';
module.exports = {
    thingPlus: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        apiHost: apiHost,
        accessTokenUri: '/v2/oauth2/token',
        redirectUri: function (appAddress) {
            return 'http://' + appAddress + '/callback'
        },
        authorizationUri: 'https://' + apiHost + '/v2/oauth2/authorize',        
        gatewaysUri: 'https://' + apiHost + '/v2/gateways',
        userUri: 'https://' + apiHost + '/v2/users/me',
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