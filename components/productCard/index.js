import Link from "next/link";
import { useEffect, useState } from "react";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";

export default function ProductCard({ product }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );
  const [stylesOptions, setStylesOptions] = useState(
    product.subProducts.map((p) => {
      return p.color;
    })
  );

  useEffect(() => {
    setImages(product.subProducts[active].images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active, product]);

  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active}`} target="_blank">
          <div className={styles.product__image}>
            <ProductSwiper images={images} />
          </div>
        </Link>
        {product.subProducts[active].discount ? (
          <div className={styles.product__discount}>
            -{product.subProducts[active].discount}%
          </div>
        ) : null}
        <div className={styles.product__infos}>
          <h3 className={styles.product__brand}>{product.brand}</h3>
          <h1 className={styles.product__name}>
            {product.name.length > 45
              ? `${product.name.substring(0, 30)}...`
              : product.name}
          </h1>
          <div className={styles.product__price}>
            {prices.length === 1
              ? `₹ ${prices[0]}`
              : `₹ ${prices[0]} - ₹ ${prices[prices.length - 1]}`}
          </div>
          <div className={styles.product__colors}>
            {stylesOptions &&
              stylesOptions.map((style, i) =>
                style.image ? (
                  <img
                    key={i}
                    src={style.image}
                    className={i == active ? styles.active : ""}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images);
                      setActive(i);
                    }}
                    alt={style.color}
                  />
                ) : (
                  <span
                    key={i}
                    className={i == active ? styles.active : ""}
                    style={{ backgroundColor: `${style.color}` }}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images);
                      setActive(i);
                    }}
                  ></span>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
