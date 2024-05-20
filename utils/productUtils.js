export const calculateSubPrice = (items) => {
  const newSubTotal = items.reduce((a, c) => a + Number(c.price) * c.qty, 0);
  return Number(newSubTotal).toFixed(2);
};

export const calculateTotalShipping = (items) => {
  const newShippingFee = items?.reduce((a, c) => a + Number(c.shipping), 0);
  return Number(newShippingFee).toFixed(2);
};

export const calculateTotal = (items) => {
  const newTotal = items.reduce(
    (a, c) => a + Number(c.shipping) + Number(c.price) * c.qty,
    0
  );
  return Number(newTotal).toFixed(2);
};
