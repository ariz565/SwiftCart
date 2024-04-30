import * as React from "react";
import styles from "./styles.module.scss";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { TbMinus, TbPlus } from "react-icons/tb";
import Share from "./share";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Accordian from "./Accordian";
import SimillarSwiper from "./SimillarSwiper";
import { Rating } from "@mui/material";
import { addToCart, updateCart } from "../../../store/cartSlice";
import { toast } from "react-toastify";

export default function Infos({ product, setActiveImg }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { cart } = useSelector((state) => ({ ...state }));
  const cartItems = useSelector((store) => store.cart.cartItems);
  // console.log(cartItems);

  useEffect(() => {
    setSize("");
    setQty(1);
  }, [router.query.style]);

  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [router.query.size, product.quantity, qty]);

  const addToCartHandler = async () => {
    try {
      if (!router.query.size) {
        setError("Please select a size!");
        return;
      }

      const { data } = await axios.get(
        `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
      );

      if (!data || !data.quantity) {
        setError("Failed to fetch product information.");
        return;
      }

      toast.success(data.message);
      console.log(data);

      // Move subsequent logic inside the try block
      if (qty > data.quantity) {
        setError(
          "The Quantity you have Choosed is more than in stock! Try a lower QTy!"
        );
      } else if (data.quantity < 1) {
        setError("This Product is out of stock!");
        return;
      } else {
        let _uid = `${data._id}_${product.style}_${router.query.size}`;
        let exist = cart.cartItems.find((p) => p._uid === _uid);
        console.log(exist);
        if (exist) {
          let newCart = cart.cartItems.map((p) => {
            if (p._uid == exist._uid) {
              return { ...p, qty: qty };
            }
            return p;
          });
          dispatch(updateCart(newCart));
        } else {
          dispatch(
            addToCart({
              ...data,
              qty: 1,
              size: data.size,
              _uid,
            })
          );
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className={styles.infos__container}>
      <h1 className={styles.infos__name}>{product.name}</h1>
      <h2 className={styles.infos__sku}>{product.sku}</h2>
      <div className={styles.infos__rating}>
        <Rating
          name="half-rating-read"
          value={product.rating}
          precision={0.5}
          readOnly
          style={{ width: "100px", color: "#FACF19", fontSize: "1.5rem" }}
        />
        ({product.numReviews}
        {product.numReviews == 1 ? " review" : " reviews"})
      </div>
      <div className={styles.infos__price}>
        {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price} Rs.</h1>}
        {product.discount > 0 ? (
          <h3>
            {size && <span>{product.priceBefore} Rs.</span>}
            <span>(-{product.discount}%)</span>
          </h3>
        ) : (
          ""
        )}
      </div>
      <span className={styles.infos__shipping}>
        {product.shipping
          ? `+${product.shipping} Rs. shipping fee`
          : `Free shipping`}
      </span>
      <span>
        {!size
          ? product.quantity
          : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
        pieces available
      </span>
      <div className={styles.infos__sizes}>
        <h4>Select a Size : </h4>
        <div className={styles.infos__sizes_wrap}>
          {product.sizes.map((size, i) => (
            <Link
              key={i}
              href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
            >
              <div
                className={`${styles.infos__sizes_size} Rs.{
                  i == router.query.size && styles.active_size
                }`}
                onClick={() => setSize(size.size)}
              >
                {size.size}
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.infos__colors}>
          {product.colors &&
            product.colors.map((color, i) => (
              <span
                key={i}
                className={i == router.query.style ? styles.active_color : ""}
                onMouseOver={() =>
                  setActiveImg(product.subProducts[i].images[0].url)
                }
                onMouseLeave={() => setActiveImg("")}
              >
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <img src={color.image} alt="" />
                </Link>
              </span>
            ))}
        </div>
        <div className={styles.infos__qty}>
          <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button
            onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
          >
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button
            disabled={product.quantity < 1}
            style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
            onClick={(e) => addToCartHandler()}
          >
            <BsHandbagFill />
            <b>ADD TO CART</b>
          </button>
          <button>
            <BsHeart />
            <b>WISHLIST</b>
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {success && <span className={styles.success}>{success}</span>}
        <Share />
        <Accordian details={[product.description, ...product.details]} />
        <SimillarSwiper />
      </div>
    </div>
  );
}
