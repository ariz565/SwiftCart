import Layout from "@/components/admin/layout";
import styles from "@/styles/products.module.scss";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductCard from "@/components/admin/products/productCard";
import OverviewCard from "@/components/admin/products/overviewProducts/OverviewCard"; // Correct import

export default function All({ products, metrics }) {
  return (
    <Layout>
      <div className={styles.header}>All Products</div>
      <OverviewCard metrics={metrics} /> {/* Add the OverviewCard component */}
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Layout>
  );
}
export async function getServerSideProps(ctx) {
  await db.connectDb();
  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();

  // Calculate metrics and prepare lists
  const totalProducts = products.length;
  const outOfStockProducts = products.filter((product) =>
    product.subProducts.every((subProduct) =>
      subProduct.sizes.every((size) => size.qty === 0)
    )
  );
  const lowStockProducts = products.filter((product) =>
    product.subProducts.some((subProduct) =>
      subProduct.sizes.some((size) => size.qty <= 20 && size.qty > 0)
    )
  );

  const metrics = {
    totalProducts,
    outOfStockCount: outOfStockProducts.length,
    lowStockCount: lowStockProducts.length,
  };

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      metrics,
      outOfStockProducts: JSON.parse(JSON.stringify(outOfStockProducts)),
      lowStockProducts: JSON.parse(JSON.stringify(lowStockProducts)),
    },
  };
}
