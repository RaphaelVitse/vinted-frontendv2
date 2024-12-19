import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// import { useLocation } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, amount }) => {
  //   const location = useLocation();
  //   const { title, amount } = location.state;
  console.log("title =======>", title);
  console.log("amount =======>", amount);

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const response = await axios.post("http://localhost:3000/payment/", {
      title,
      amount,
    });
    console.log("response.data ====", response);

    const clientSecret = response.data.paymentIntent.client_secret;
    console.log("clientsecret =====", clientSecret);

    const stripeResponse = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });
    if (stripeResponse.error) {
      setErrorMessage(stripeResponse.error.message);
    }
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    setIsLoading(false);
  };

  return completed ? (
    <p className="confirm-payment">
      Paiement effectué. Merci pour votre achat !
    </p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Payer
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
