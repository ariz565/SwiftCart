import { useEffect } from "react";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  const { payment_intent } = router.query; // Stripe returns the payment intent ID

  useEffect(() => {
    if (payment_intent) {
      // Fetch payment intent details from your server if needed
      fetch(`/api/get-payment-intent?payment_intent=${payment_intent}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Payment Intent:", data);
          // Handle the payment result (e.g., display payment details to the user)
        })
        .catch((error) =>
          console.error("Error fetching payment intent:", error)
        );
    }
  }, [payment_intent]);

  return (
    <div>
      <h1>Payment successful!</h1>
      <p>Thank you for your purchase.</p>
    </div>
  );
};

export default Success;
