import Link from "next/link";
import styles from "./RecentlyViewed.module.scss"; // Import the new SCSS module
import { useMediaQuery } from "react-responsive";
import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";
import axios from "axios";

const RecentlyViewed = ({ user, tab }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const isMedium = useMediaQuery({ query: "(max-width: 1023px)" });
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });

  const fetchRecentData = async (recentlyIds) => {
    setLoading(true);
    const { data } = await axios.post("/api/product/recent", {
      ids: recentlyIds,
    });
    setLoading(false);
    setProducts(data);
  };

  useEffect(() => {
    try {
      let recentlyIds = JSON.parse(localStorage.getItem("recent-ids"));
      recentlyIds = recentlyIds.slice(0, 6).reverse() || [];
      fetchRecentData(recentlyIds);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.recentlyViewed}>
      <h2>Recently Viewed Products</h2>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            className={isLarge ? "grid__4" : isMedium ? "grid__3" : "grid__2"}
          />
        ))}
      </div>
    </div>
  );
};
export async function getServerSideProps(ctx) {
  const { query, req } = ctx;

  const tab = query.tab || 0;
  const session = await getSession(ctx);
  const user = await User.findById(session.user.id)
    .select("image name")
    .populate("wishlist.product")
    .lean();

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      tab,
    },
  };
}

export default RecentlyViewed;
