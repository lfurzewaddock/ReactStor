export default {
  oidcIdp: {
    url: "yourOktaDomainString",
    issuer: "yourOktaDomainString/oauth2/default",
    redirectUri: `${window.location.origin}/implicit/callback`,
    clientId: "yourOktaClientID",
    scopes: ["openid", "email", "profile"],
    responseType: ["id_token", "token"],
  },
  api: {
    baseUrl: "http://localhost:3000",
  },
  paymentGateway: {
    apiKey: "pk_test_yourStripePublishableKey",
  },
};
