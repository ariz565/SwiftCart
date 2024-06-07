// pages/success.js
import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { resetCart } from "@/store/cartSlice"; // Adjust the path as needed
import { runFireworks } from "@/utils/orderSuccesss";
import styles from "@/styles/success.module.scss";

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCart());
    runFireworks();
  }, [dispatch]);

  return (
    <div className={styles["success-wrapper"]}>
      <div className={styles.success}>
        <p className={styles.icon}>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className={styles["email-mesg"]}>
          Check your email inbox for the receipt.
        </p>
        <p className={styles.description}>
          If you have any questions, please email us at
          <a className={styles.email} href="mailto:support@swiftcart.com">
            support@swiftcart.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className={styles.btn}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
