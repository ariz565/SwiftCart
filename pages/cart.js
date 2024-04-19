import Empty from "@/components/cart/empty";
import Header from "@/components/cart/header";
import Product from "@/components/cart/product";
import styles from "@/styles/cart.module.scss";
import { useSelector } from "react-redux";

export default function Cart() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems && cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <div className={styles.cart__product}>
              {cart.cartItems.map((product) => (
                <Product product={product} key={product._uid} />
              ))}
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}
