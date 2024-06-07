import Layout from "@/components/admin/layout";
import styles from "@/styles/products.module.scss";
import ProductCard from "@/components/admin/products/productCard";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export default function OutOfStock({ products }) {
  return (
    <Layout>
      <div className={styles.header}>Out of Stock Products</div>
      {products.map((product) => (
        <div key={product._id} className={styles.product}>
          <ProductCard product={product} />
          <div className={styles.outOfStockDetails}>
            <h3>Out of Stock Details:</h3>
            <ul>
              {product.outOfStockDetails.map((detail, index) => (
                <li key={index}>
                  Style: {detail.style}, Size: {detail.size}, Quantity:{" "}
                  {detail.qty}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .lean();
  await db.disconnectDb();

  const outOfStockProducts = products
    .filter((product) =>
      product.subProducts.every((subProduct) =>
        subProduct.sizes.every((size) => size.qty === 0)
      )
    )
    .map((product) => {
      const outOfStockDetails = product.subProducts.flatMap(
        (subProduct, styleIndex) =>
          subProduct.sizes
            .filter((size) => size.qty === 0)
            .map((size) => ({
              styleIndex,
              style: subProduct.color.color,
              size: size.size,
              qty: size.qty,
            }))
      );

      return { ...product, outOfStockDetails };
    });

  return {
    props: {
      products: JSON.parse(JSON.stringify(outOfStockProducts)),
    },
  };
}
