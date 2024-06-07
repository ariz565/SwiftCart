import { useState } from "react";
import { useEffect } from "react";
import { FcFullTrash } from "react-icons/fc";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";

import { updateCart } from "@/store/cartSlice";

import styles from "./styles.module.scss";

const Top = ({ cartItems, selected, setSelected }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const isSuperSmall = useMediaQuery({ query: "(max-width: 488px)" });

  const selectAllHandler = () => {
    if (!active) {
      setSelected(cartItems);
      setActive(true);
    } else {
      setSelected([]);
      setActive(false);
    }
  };

  const showPopupHandler = () => {
    if (selected?.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: `Your selected ${
          selected?.length > 1 ? "products" : "product"
        } will be removed form cart!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      }).then((result) => {
        if (result.isConfirmed) {
          removeProductsHandler();
          Swal.fire(
            "Removed!",
            `Your selected ${
              selected?.length > 1 ? "products have" : "product has"
            } been removed form cart!`,
            "success"
          );
        }
      });
    } else {
      Swal.fire({
        title: "What do you want to remove?",
        text: "Please choose at least 1 product!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };

  const removeProductsHandler = () => {
    const selected_Uids = selected?.map((s) => s._uniqueId);
    const newCart = cartItems.filter((item) => {
      return !selected_Uids.includes(item._uniqueId);
    });
    dispatch(updateCart(newCart));
    setSelected([]);
  };

  useEffect(() => {
    if (selected?.length < cartItems.length && active) {
      setActive(false);
    }

    if (selected?.length === cartItems.length) {
      setActive(true);
    }
  }, [selected]);

  return (
    <div className={`${styles.cart__top} ${styles.card}`}>
      <span className={styles.cart__top_label}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={selectAllHandler}
        ></div>
        All {!isSuperSmall && `(${cartItems.length} products)`}
      </span>
      <span className={styles.cart__top_label}>Unit price</span>
      <span className={styles.cart__top_label}>Quantity</span>
      <span className={styles.cart__top_label}>Amount</span>
      <span className={styles.cart__top_label} onClick={showPopupHandler}>
        <FcFullTrash />
      </span>
    </div>
  );
};

export default Top;
