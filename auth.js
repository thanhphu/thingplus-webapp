const apiHost = 'api.thingplus.net';
module.exports = {
    thingPlus: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        apiHost: apiHost,
        accessTokenUri: '/v2/oauth2/token',
        authorizationUri: 'https://' + apiHost + '/v2/oauth2/authorize',
        redirectUri: function (host) {
            return 'http://' + host + '/callback'
        },
        scopes: [
            "user-profile-read",
            "gateway",
            "gateway-update",
            "timeline-read",
            "tag",
            "rule-read",
            "service-read",
            "site-read"
        ]
    }
}