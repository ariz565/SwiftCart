import Layout from "@/components/admin/layout";
import styles from "@/styles/products.module.scss";
import ProductCard from "@/components/admin/products/productCard";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export default function LowStock({ products }) {
  return (
    <Layout>
      <div className={styles.header}>Low Stock Products</div>
      {products.map((product) => (
        <div key={product._id} className={styles.product}>
          <ProductCard product={product} />
          <div className={styles.lowStockDetails}>
            <h3>Low Stock Details:</h3>
            <ul>
              {product.lowStockDetails.map((detail, index) => (
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

  const lowStockProducts = products
    .filter((product) =>
      product.subProducts.some((subProduct) =>
        subProduct.sizes.some((size) => size.qty <= 20 && size.qty > 0)
      )
    )
    .map((product) => {
      const lowStockDetails = product.subProducts.flatMap(
        (subProduct, styleIndex) =>
          subProduct.sizes
            .filter((size) => size.qty <= 20 && size.qty > 0)
            .map((size) => ({
              styleIndex,
              style: subProduct.color.color,
              size: size.size,
              qty: size.qty,
            }))
      );

      return { ...product, lowStockDetails };
    });

  return {
    props: {
      products: JSON.parse(JSON.stringify(lowStockProducts)),
    },
  };
}
