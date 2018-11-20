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
    const { token } = await stripe.createToken({ name: "Name" });
    const response = await fetch(`${config.api.baseUrl}/api/charges`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id,
    });

    // if (response.ok) console.log("Purchase Complete!"); /* eslint-disable-line no-console */
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
