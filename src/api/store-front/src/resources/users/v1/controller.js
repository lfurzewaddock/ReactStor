import Debug from "debug";
import okta from "@okta/okta-sdk-nodejs";

const debug = Debug("reactstor:store-api:resources");
debug("define control functions (users)");

const oktaClient = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN,
});

// eslint-disable-next-line import/prefer-default-export
export async function registerUser(request) {
  const newUser = {
    profile: {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      postalAddress: request.body.postalAddress,
      billingAddress: request.body.billingAddress,
      email: request.body.email,
      login: request.body.email,
    },
    credentials: {
      password: {
        value: request.body.password,
      },
    },
  };

  let data = {};
  try {
    data = await oktaClient.createUser(newUser);
  } catch (e) {
    debug(`registerUser ctrl error: ${e}`);
    return e;
  }
  // Note: Fastify will only set status code to 204 (no content),
  // if payload is missing/empty, but not for an empty array: (zero results).
  debug(`new user id: ${data.id}`);
  return data.id; // note we return the promise without using '.send()'
}

// data returned sample...
// {
//   id: '00uhsh1npicRXDNzk0w7',
//   status: 'ACTIVE',
//   created: '2018-11-24T20:34:43.000Z',
//   activated: '2018-11-24T20:34:44.000Z',
//   statusChanged: '2018-11-24T20:34:44.000Z',
//   lastLogin: null,
//   lastUpdated: '2018-11-24T20:34:44.000Z',
//   passwordChanged: '2018-11-24T20:34:44.000Z',
//   profile:
//    UserProfile: {
//      firstName: 'First Name 29',
//      lastName: 'Last Name 29',
//      postalAddress: 'Postal Address 29',
//      mobilePhone: null,
//      secondEmail: null,
//      billingAddress: 'Billing Address 29',
//      login: 'test29@test.com',
//      email: 'test29@test.com' },
//   credentials:
//    UserCredentials: {
//      password: PasswordCredential {},
//      emails: [ [Object] ],
//      provider: AuthenticationProvider { type: 'OKTA', name: 'OKTA' } },
//   _links:
//    { suspend:
//       { href: 'https://yourOktaDomainString/api/v1/users/00uhsh1npicRXDNzk0w7/lifecycle/suspend',
//         method: 'POST' },
//      resetPassword:
//       { href: 'https://yourOktaDomainString/api/v1/users/00uhsh1npicRXDNzk0w7/lifecycle/reset_password',
//         method: 'POST' },
//      expirePassword:
//       { href: 'https://yourOktaDomainString/api/v1/users/00uhsh1npicRXDNzk0w7/lifecycle/expire_password',
//         method: 'POST' },
//      changeRecoveryQuestion:
//       { href: 'https://yourOktaDomainString/api/v1/users/00uhsh1npicRXDNzk0w7/credentials/change_recovery_question',
//         method: 'POST' },
//      self:
//       { href: 'https://yourOktaDomainString/api/v1/users/00uhsh1npicRXDNzk0w7' },
//      changePassword:
//       { href: 'https://yourOktaDomainString/api/v1/users/00uhsh1npicRXDNzk0w7/credentials/change_password',
//         method: 'POST' },
//      deactivate:
//       { href: 'https://yourOktaDomainString/api/v1/users/00uhsh1npicRXDNzk0w7/lifecycle/deactivate',
//         method: 'POST' }
//       }
//     }
