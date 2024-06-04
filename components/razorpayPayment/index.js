import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";



export default function RazorpayPayment({
  total,
  order_id,
  razorpay_key_id,
  shippingAddress,
  email,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRazorpayPayment = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/order/${order_id}/payWithRazorpay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }), // Send the amount to the API
      });

      const data = await response.json();

      const options = {
        key: razorpay_key_id,
        amount: data.amount,
        currency: data.currency,
        name: "SwiftCart",
        description: `Order #${order_id}`,
        order_id: data.id,
        handler: async function (response) {
          const paymentResult = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          try {
            const res = await axios.put(
              `/api/order/${order_id}/pay`,
              paymentResult
            );
            if (res.data.success) {
              window.location.reload(); // Reload the page to update order status
            }
          } catch (error) {
            console.error(error);
          }
        },
        prefill: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: email,
          contact: shippingAddress.phone || "", // Prefill if phone is available
        },
        notes: {
          address: `${shippingAddress.address1}, ${shippingAddress.city}, ${shippingAddress.state}`,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   
      <div className={styles.razorpay}>
        <button onClick={handleRazorpayPayment}>Pay with Razorpay</button>
        {isLoading && <p>Loading...</p>}
      </div>
    
  );
}
