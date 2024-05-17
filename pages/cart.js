import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Header from "@/components/cart/header";
import styles from "../styles/cart.module.scss";
import Empty from "@/components/cart/empty";
import Product from "@/components/cart/product";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "../requests/user";

import { updateCart } from "../store/cartSlice";
import { women_swiper } from "../data/home";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethods";
import ProductsSwiper from "@/components/productsSwiper";

export default function Cart() {
  //---
  const Router = useRouter();
  const { data: session } = useSession();
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  //-------

  //----
  // useEffect(() => {
  //   const update = async () => {
  //     const { data } = await axios.post("/api/user/saveCart", {
  //       products: cart.cartItems,
  //     });
  //     dispatch(updateCart(data));
  //   };
  //   if (cart.cartItems.length > 0) {
  //     update();
  //   }
  // }, [cart, dispatch]);
  //----

  // ------
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  //----
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
  }, [selected, shippingFee]);

  const saveCartToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected, session.user.id);
      Router.push("/checkout");
    } else {
      signIn();
    }
  };
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
              saveCartToDbHandler={saveCartToDbHandler}
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
