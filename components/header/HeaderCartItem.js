import styles from "./styles.module.scss";

export default function HeaderCartItem({ item }) {
  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__item_image}>
        <img src={item.images[0].url} alt={item.name} />
        <p>{item.qty}</p>
      </div>
      <div className={styles.cart__item_info}>
        <p>{item.name.substring(0, 40) + "..."}</p>
        <p>
          <span>${item.price?.toFixed(2)}</span>
          <strike>${item.priceBefore?.toFixed(2)}</strike>
        </p>
      </div>
      <div className={styles.cart__item_amount}>
        ${(item.qty * item.price).toFixed(2)}
      </div>
    </div>
  );
}
