import React from "react";

import styled from "./styles.module.scss";
import NextImage from "../NextImage";

const Payment = () => {
  return (
    <div className={styled.footer__payment}>
      <div className={styled.footer__payment_img}>
        <NextImage src="/images/payment/visa.webp" alt="Visa" />
      </div>
      <div className={styled.footer__payment_img}>
        <NextImage src="/images/payment/mastercard.webp" alt="Mastercard" />
      </div>
      <div className={styled.footer__payment_img}>
        <NextImage src="/images/payment/paypal.webp" alt="Paypal" />
      </div>
    </div>
  );
};

export default Payment;
