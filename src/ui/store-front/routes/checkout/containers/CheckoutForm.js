import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

import config from "../../../app-config";

class CheckoutForm extends Component {
  state = {
    complete: false,
  }

  submit = async (ev) => {
    console.log(ev); /* eslint-disable-line no-console */
    const { stripe } = this.props;
    const createToken = await stripe.createToken({ name: "Name" });

    // stripe.createToken data returned sample...
    // {
    //   card: {
    //     address_city: null,
    //     address_country: null,
    //     address_line1: null,
    //     address_line1_check: null,
    //     address_line2: null,
    //     address_state: null,
    //     address_zip: "12345",
    //     address_zip_check: "unchecked",
    //     brand: "Visa",
    //     country: "US",
    //     cvc_check: "unchecked",
    //     dynamic_last4: null,
    //     exp_month: 10,
    //     exp_year: 2020,
    //     funding: "credit",
    //     id: "card_1DaUDIBG91Xbqo6XERwGHY4X",
    //     last4: "4242",
    //     metadata: {},
    //     name: "Name",
    //     object: "card",
    //     tokenization_method: null,
    //   },
    //   client_ip: "185.212.169.142",
    //   created: 1543177700,
    //   id: "tok_1DaUDIBG91Xbqo6XBrQigXZy",
    //   livemode: false,
    //   object: "token",
    //   type: "card",
    //   used: false,
    // };

    // stripe.createToken error returned sample...
    // {
    //   code: "incomplete_zip"
    //   message: "Your postal code is incomplete."
    //   type: "validation_error"
    // }

    const response = await fetch(`${config.api.baseUrl}/api/v1/payments`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      },
      body: createToken.token.id,
    });

    if (response.ok) this.setState({ complete: true });
  }

  render() {
    const { complete } = this.state;
    if (complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="button" onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
