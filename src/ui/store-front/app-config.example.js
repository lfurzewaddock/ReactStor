export default {
  oidcIdp: {
    url: "yourOktaDomainString",
    issuer: "yourOktaDomainString/oauth2/default",
    redirectUri: `${window.location.origin}/implicit/callback`,
    clientId: "yourOktaClientID",
  },
  api: {
    baseUrl: "http://localhost:3000",
  },
};
