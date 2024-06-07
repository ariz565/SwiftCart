import { updateCart } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import { FcShop, FcFullTrash } from "react-icons/fc";
import { MdOutlineKeyboardArrowRight, MdPlayArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";
import Link from "next/link";

const Product = ({ product, selected, setSelected }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);

  const isSmall = useMediaQuery({ query: "(max-width: 684px)" });
  const isSuperSmall = useMediaQuery({ query: "(max-width: 488px)" });

  const updateQtyHandler = (type) => {
    let newCart = cart.cartItems.map((p) => {
      if (p._uid === product._uid) {
        return {
          ...p,
          qty: type === "plus" ? p.qty + 1 : p.qty - 1,
        };
      }
      return p;
    });
    dispatch(updateCart(newCart));

    if (selected.length > 0) {
      setSelected(() => {
        const newSelected = [...selected];
        const itemIndex = newSelected.findIndex((a) => a._uid === product._uid);
        const newItem = { ...newSelected[itemIndex] };
        if (type === "plus") {
          newItem.qty = newItem.qty + 1;
        } else {
          newItem.qty = newItem.qty - 1;
        }
        newSelected[itemIndex] = newItem;
        return newSelected;
      });
    }
  };

  const removeFromCartHandler = () => {
    let newCart = cart.cartItems.filter((p) => p._uid !== product._uid);
    dispatch(updateCart(newCart));
  };

  useEffect(() => {
    const check = selected?.find((p) => p._uid == product._uid);
    setActive(check);
  }, [selected]);

  const selectHandler = () => {
    if (active) {
      setSelected(selected?.filter((p) => p._uid !== product._uid));
    } else {
      setSelected([...selected, product]);
    }
  };

  const showPopupHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `This item will be removed from cart!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCartHandler();
        Swal.fire(
          "Deleted!",
          "Your item has been removed from cart.",
          "success"
        );
      }
    });
  };

  return (
    <div className={styles.cart__product}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.cart__product_header}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={selectHandler}
        ></div>
        <Link href={"/"}>
          <FcShop />
          TradeHub
          <MdPlayArrow />
        </Link>
      </div>
      <div className={styles.cart__product_body}>
        <div className={styles.infos}>
          <div
            className={`${styles.checkbox} ${styles.img__check} ${
              active ? styles.active : ""
            }`}
            onClick={selectHandler}
          ></div>
          {!isSmall && (
            <Link
              target="_blank"
              href={`/product/${product.slug}?style=${product.style}`}
              className={styles.image}
            >
              <img src={product.images[0].url} />
            </Link>
          )}
          <div className={styles.detail}>
            <h3>{product.name}</h3>
            {product.size && (
              <p>
                <span>Size :&nbsp;</span>
                {product.size}
              </p>
            )}
            <p>
              <span>Style :&nbsp;</span>
              {product.color.image ? (
                <img src={product.color.image} alt="" />
              ) : (
                <span
                  style={{
                    backgroundColor: product.color.color,
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></span>
              )}
            </p>
            {!isSuperSmall && (
              <p>
                <span>Ship fee :&nbsp;</span>
                {product.shipping ? `₹${product.shipping}` : "Free shipping"}
              </p>
            )}
            {!isSuperSmall && (
              <p>
                <span>Details :&nbsp;</span>
                <Link
                  target="_blank"
                  href={`/product/${product.slug}?style=${product.style}`}
                >
                  Click here <MdOutlineKeyboardArrowRight />
                </Link>
              </p>
            )}
          </div>
        </div>
        <div className={styles.price}>
          {product.discount > 0 && !isSmall && (
            <p className={styles.price__discount}>
              Discount :&nbsp;&nbsp;
              <span>-{product.discount}%</span>
            </p>
          )}
          <div className={styles.price__number}>
            {product.price && <span>₹{product.price.toFixed(2)}</span>}
            {product.price !== product.priceBefore && !isSmall && (
              <del>₹{product.priceBefore}</del>
            )}
          </div>
        </div>
        <div className={styles.quantity}>
          <button
            disabled={product.qty < 2}
            onClick={() => updateQtyHandler("minus")}
          >
            -
          </button>
          <span>{product.qty}</span>
          <button
            disabled={product.qty == product.quantity}
            onClick={() => updateQtyHandler("plus")}
          >
            +
          </button>
        </div>
        <span className={styles.amount}>
          ₹{(product.price * product.qty).toFixed(2)}
        </span>
        <div className={styles.action}>
          <div
            className={styles.action__delete}
            style={{ zIndex: 2 }}
            onClick={showPopupHandler}
          >
            <FcFullTrash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
