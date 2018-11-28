import Debug from "debug";
import stripe from "stripe";
// var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const debug = Debug("reactstor:store-api:resources");
debug("define control functions (payments)");

// eslint-disable-next-line import/prefer-default-export
export async function transaction(request) {
  let data = {};
  // request.body returned sample: tok_1DaVudBG91Xbqo6X02UwDF3i
  console.log("request.body: ", request.body); /* eslint-disable-line no-console */
  try {
    data = await stripe.charges(process.env.STRIPE_SECRET_KEY).create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: request.body,
    });
  } catch (e) {
    debug(`transaction ctrl error: ${e}`);
    return e;
  }

  console.log("data: ", data); /* eslint-disable-line no-console */
  // Note: Fastify will only set status code to 204 (no content),
  // if payload is missing/empty, but not for an empty array: (zero results).
  return data; // note we return the promise without using '.send()'
}

// data returned sample...
// {
//  id: 'ch_1DaVueBG91Xbqo6X2n7rZg9O',
//   object: 'charge',
//   amount: 2000,
//   amount_refunded: 0,
//   application: null,
//   application_fee: null,
//   balance_transaction: 'txn_1DaVufBG91Xbqo6Xp7xlj53N',
//   captured: true,
//   created: 1543184232,
//   currency: 'usd',
//   customer: null,
//   description: 'An example charge',
//   destination: null,
//   dispute: null,
//   failure_code: null,
//   failure_message: null,
//   fraud_details: {},
//   invoice: null,
//   livemode: false,
//   metadata: {},
//   on_behalf_of: null,
//   order: null,
//   outcome:
//    { network_status: 'approved_by_network',
//      reason: null,
//      risk_level: 'normal',
//      risk_score: 29,
//      seller_message: 'Payment complete.',
//      type: 'authorized' },
//   paid: true,
//   payment_intent: null,
//   receipt_email: null,
//   receipt_number: null,
//   refunded: false,
//   refunds:
//    { object: 'list',
//      data: [],
//      has_more: false,
//      total_count: 0,
//      url: '/v1/charges/ch_1DaVueBG91Xbqo6X2n7rZg9O/refunds' },
//   review: null,
//   shipping: null,
//   source:
//    { id: 'card_1DaVudBG91Xbqo6XlqXHNnD4',
//      object: 'card',
//      address_city: null,
//      address_country: null,
//      address_line1: null,
//      address_line1_check: null,
//      address_line2: null,
//      address_state: null,
//      address_zip: '45637',
//      address_zip_check: 'pass',
//      brand: 'Visa',
//      country: 'US',
//      customer: null,
//      cvc_check: 'pass',
//      dynamic_last4: null,
//      exp_month: 4,
//      exp_year: 2022,
//      fingerprint: 'miv6Nr0xH6oiqcHo',
//      funding: 'credit',
//      last4: '4242',
//      metadata: {},
//      name: 'Name',
//      tokenization_method: null },
//   source_transfer: null,
//   statement_descriptor: null,
//   status: 'succeeded',
//   transfer_group: null }
