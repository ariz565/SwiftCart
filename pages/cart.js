import { useSelector, useDispatch } from "react-redux";
import Header from "@/components/cart/header";
import styles from "../styles/cart.module.scss";
import Empty from "@/components/cart/empty";
import Product from "@/components/cart/product";
import { useEffect, useState } from "react";
import { updateCart } from "../store/cartSlice";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethods";
import ProductsSwiper from "@/components/productsSwiper";

export default function Cart() {
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // ------
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setShippingFee(
      selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    );
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
      ).toFixed(2)
    );
  }, [selected]);
  // ------
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__product}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        <ProductsSwiper products={women_swiper} />
      </div>
    </>
  );
}
