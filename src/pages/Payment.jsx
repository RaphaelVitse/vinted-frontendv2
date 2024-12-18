import "../pages/payment.css";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51QPSoPFFkau1AMqvzqlr8QeNmA8ONLTFO5rLT8Fh0vGbBEwD15roN8NXFR0qKEwbG3uj38snhmrXEcHsbac8Ufsg007rG4Vyaw"
);

const Payment = () => {
  const location = useLocation();
  const { price, name } = location.state;

  const protectionCost = 0.4;
  const deliveryCost = 0.8;
  const total = (price + protectionCost + deliveryCost).toFixed(2);
  //   console.log(total);

  const options = {
    mode: "payment",
    title: name,
    amount: Number(total * 100),
    currency: "eur",
  };
  console.log(options);

  return (
    <section className="payment">
      <div className="payment-container">
        <p>Résumé de la commande</p>
        <div className="details-payment">
          <div className="details-purchase">
            <p>Commande</p>
            <p>Frais protection des acheteurs</p>
            <p>Frais de port</p>
          </div>
          <div className="details-price">
            <p>{price} €</p>
            <p>{protectionCost} €</p>
            <p>{deliveryCost} €</p>
          </div>
        </div>
        <div className="total-price">
          <p>Total</p>
          <p>{total} €</p>
        </div>
        <p className="recap-purchase">
          Il ne vous reste plus qu'une étape pour vous offrir {name} vous allez
          payer {total} € (frais de protection et frais de port inclus)
        </p>
        <div className="stripe">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm title={name} amount={total} />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;
