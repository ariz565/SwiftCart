import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { TbMinus, TbPlus } from "react-icons/tb";
import Share from "./Share";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Accordian from "./Accordian";
import SimillarSwiper from "./SimillarSwiper";
import { addToCart, updateCart } from "../../../store/cartSlice";
import { toast } from "react-toastify";

export default function Infos({ product, setActiveImg }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [selectedSize, setSelectedSize] = useState(router.query.size);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { cart } = useSelector((state) => state);

  useEffect(() => {
    if (quantity > product.quantity) {
      setQuantity(product.quantity);
    }
  }, [product.quantity, quantity]);

  const handleAddToCart = async () => {
    if (!router.query.size) {
      setError("Please select a size.");
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
      );
      console.log(data);

      if (quantity > data.quantity) {
        setError("The selected quantity exceeds our stock. Please adjust.");
      } else if (data.quantity < 1) {
        setError("This product is out of stock.");
      } else {
        const _uid = `${data._id}_${product.style}_${router.query.size}`;
        const existingItem = cart.cartItems?.find((p) => p._uid === _uid);
        console.log(existingItem);

        if (existingItem) {
          const newCart = cart.cartItems.map((p) =>
            p._uid === existingItem._uid ? { ...p, qty: quantity } : p
          );
          dispatch(updateCart(newCart));
        } else {
          dispatch(
            addToCart({ ...data, qty: quantity, size: data.size, _uid })
          );
        }

        setError("");
        setSuccess("Added to cart!");
      }
    } catch (error) {
      setError("Failed to add to cart. Please try again.");
      console.error(error);
    }
  };

  const productQuantity = product.sizes.reduce(
    (total, size) => total + size.qty,
    0
  );

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
        ({product.numReviews} {product.numReviews === 1 ? "review" : "reviews"})
      </div>
      <div className={styles.infos__price}>
        {!selectedSize ? (
          <h2>{product.priceRange}</h2>
        ) : (
          <>
            <h1>{product.price} Rs.</h1>
            {product.discount > 0 && (
              <h3>
                {selectedSize && <span>{product.priceBefore} Rs.</span>}
                <span>(-{product.discount}%)</span>
              </h3>
            )}
          </>
        )}
      </div>
      <span className={styles.infos__shipping}>
        {product.shipping
          ? `+${product.shipping} Rs. shipping fee`
          : "Free shipping"}
      </span>
      <span>
        {!selectedSize ? product.quantity : productQuantity} pieces available
      </span>
      <div className={styles.infos__sizes}>
        <h4>Select a Size:</h4>
        <div className={styles.infos__sizes_wrap}>
          {product.sizes.map((size, i) => (
            <Link
              key={i}
              href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
            >
              <div
                className={`${styles.infos__sizes_size} ${
                  i === parseInt(router.query.size) && styles.active_size
                }`}
                onClick={() => setSelectedSize(size.size)}
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
                className={
                  i === parseInt(router.query.style) ? styles.active_color : ""
                }
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
          <button
            onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
          >
            <TbMinus />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() =>
              quantity < product.quantity && setQuantity((prev) => prev + 1)
            }
          >
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button
            disabled={productQuantity < 1}
            style={{ cursor: `${productQuantity < 1 ? "not-allowed" : ""}` }}
            onClick={handleAddToCart}
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
