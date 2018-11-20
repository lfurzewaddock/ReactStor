import React from "react";
import PropTypes from "prop-types";
import ScriptLoader from "react-script-loader-hoc";
import { StripeProvider, Elements } from "react-stripe-elements";
import CheckoutForm from "../containers/CheckoutForm";
import Loader from "../../../common/ui/components/Loader";

import config from "../../../app-config";

const StripePayment = ({ scriptsLoadedSuccessfully }) => {
  if (!scriptsLoadedSuccessfully) return <Loader isLoading />;

  return (
    <StripeProvider apiKey={config.paymentGateway.apiKey}>
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

StripePayment.propTypes = {
  scriptsLoadedSuccessfully: PropTypes.bool.isRequired,
};

export default ScriptLoader("https://js.stripe.com/v3/")(StripePayment);
