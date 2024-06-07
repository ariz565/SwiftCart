export const orderConfirmationTemplate = (to, url) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Order Payment Confirmation</h2>
        <p>Hello,</p>
        <p>Thank you for your purchase! Your order has been successfully paid.</p>
        <p>You can view your order details <a href="${url}">here</a>.</p>
        <p>Best regards,<br>SwiftCart</p>
      </div>
    `;
};
