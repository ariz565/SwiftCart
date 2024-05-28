import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { TbMinus, TbPlus } from "react-icons/tb";
import { BiHeart } from "react-icons/bi";
import DialogModal from "@/components/dialogModal";
import { FaOpencart } from "react-icons/fa";
import Accordian from "./Accordian";
import { addToCart, updateCart } from "@/store/cartSlice";
import { toast } from "react-toastify";
import { hideDialog, showDialog } from "@/store/DialogSlice";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Infos({ product, setActiveImg }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [selectedSize, setSelectedSize] = useState(router.query.size);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (quantity > product.quantity) {
      setQuantity(product.quantity);
    }
  }, [product.quantity, quantity]);

  // -----------------Handle Add to Cart-----------------
  const addToCartHandler = async () => {
    setError(null); // Reset error state before new operation

    if (!router.query.size) {
      setError("Please select a size.");
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/product/${product._id}?style=${router.query.style}&size=${router.query.size}`
      );

      console.log("API Response Data:", data); // Debug log

      if (qty > data.quantity) {
        setError(
          "The quantity you have chosen is more than in stock. Try lowering the quantity."
        );
      } else if (data.quantity < 1) {
        setError("This product is out of stock.");
      } else {
        const _uid = `${data._id}_${product.style}_${router.query.size}`;
        console.log("Generated UID:", _uid); // Debug log

        console.log("Current Cart State:", cart); // Debug log
        const cartItems = cart?.cartItems || [];
        console.log("Current Cart Items:", cartItems); // Debug log

        const exist = cartItems.find((p) => p._uid === _uid);
        console.log("Existing Cart Item:", exist); // Debug log

        if (exist) {
          const newCart = cartItems.map((p) =>
            p._uid === exist._uid ? { ...p, qty } : p
          );
          console.log("Updated Cart Items:", newCart); // Debug log
          dispatch(updateCart(newCart));
          toast.success("Product added to cart successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          const newItem = {
            ...data,
            qty,
            size: data.size,
            _uid,
          };
          console.log("New Cart Item:", newItem); // Debug log
          dispatch(addToCart(newItem));
          toast.success("Product added to cart successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (error) {
      setError(
        "There was an error adding the product to the cart. Please try again."
      );
      console.error("Error adding to cart:", error);
    }
  };

  /// --------------------Handle Wishlist--------------------
  const handleWishlist = async () => {
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: product._id,
        style: product.style,
      });
      dispatch(
        showDialog({
          header: "Product Added to Wishlist Successfully",
          msgs: [
            {
              msg: data.message,
              type: "success",
            },
          ],
        })
      );
    } catch (error) {
      dispatch(
        showDialog({
          header: "Wishlist Error",
          msgs: [
            {
              msg: error.response.data.message,
              type: "error",
            },
          ],
        })
      );
    }
  };

  // --------------------------------------------------

  return (
    <div className={styles.infos}>
      <DialogModal />
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.name}</h1>
        <h2 className={styles.infos__sku}>{product.sku}</h2>
        <div className={styles.infos__rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            style={{ width: "100px", color: "#FACF19", fontSize: "1.5rem" }}
          />
          ({product.numReviews}
          {product.numReviews == 1 ? " review" : " reviews"})
        </div>
        <div className={styles.infos__price}>
          {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price}$</h1>}
          {product.discount > 0 ? (
            <h3>
              {size && <span>{product.priceBefore}$</span>}
              <span>(-{product.discount}%)</span>
            </h3>
          ) : (
            ""
          )}
        </div>
        <span className={styles.infos__shipping}>
          {product.shipping
            ? `+${product.shipping}$ Shipping fee`
            : "Free Shipping"}
        </span>
        <span>
          {size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          pieces available.
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
                  className={`${styles.infos__sizes_size} ${
                    i == router.query.size && styles.active_size
                  }`}
                  onClick={() => setSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))}
          </div>
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
                  <Image
                    src={color.image}
                    height={50}
                    width={500}
                    alt="productColor"
                  />
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
            onClick={() => addToCartHandler()}
          >
            <FaOpencart />
            <b>ADD TO CART</b>
          </button>
          <button onClick={() => handleWishlist()}>
            <BiHeart />
            WISHLIST
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {success && <span className={styles.success}>{success}</span>}
        {/* <Share /> */}
        <Accordian details={[product.description, ...product.details]} />
        {/* <SimillarSwiper /> */}
      </div>
    </div>
  );
}
