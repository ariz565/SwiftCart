import styles from "./styles.module.scss";
import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Image from "next/image";
import HeaderCartItem from "./HeaderCartItem";
import {
  calculateSubPrice,
  calculateTotal,
  calculateTotalShipping,
} from "@/utils/productUtils";

export default function Main({ searchHandler }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");
  const { cart } = useSelector((state) => ({ ...state }));
  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      } else {
        searchHandler(query);
      }
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo2.png" height={50} width={150} alt="" />
        </Link>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>

        {/* In Cart */}
        <Link href="/cart">
          <div className={styles.cart}>
            <FaOpencart />
            <span className={styles.cart__number}>
              {cart?.cartItems?.length ?? 0}
            </span>
            <div className={styles.cart__dropdown}>
              {cart?.cartItems?.length > 0 ? (
                <div>
                  <div className={styles.cart__items}>
                    {cart.cartItems.map((item) => (
                      <HeaderCartItem key={item._uniqueId} item={item} />
                    ))}
                  </div>
                  <div className={styles.cart__priceComponent}>
                    <p>
                      <span>Subtotal :</span>
                      <span>₹{calculateSubPrice(cart.cartItems)}</span>
                    </p>
                    <p>
                      <span>Shipping :</span>
                      <span>₹{calculateTotalShipping(cart.cartItems)}</span>
                    </p>
                  </div>
                  <div className={styles.cart__total}>
                    <span>Total :</span>
                    <span>{calculateTotal(cart.cartItems)}₹</span>
                  </div>
                  <div className={styles.cart__seeAll}>
                    See all items in cart
                  </div>
                </div>
              ) : (
                <div className={styles.cart__empty}>
                  <div className={styles.cart__empty_img}>
                    <img src="/images/empty.png" alt="Empty Cart" />
                  </div>
                  <p>Cart is empty!</p>
                  <div className={styles.cart__empty_btn}>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push("/browse");
                      }}
                    >
                      SHOP NOW
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
