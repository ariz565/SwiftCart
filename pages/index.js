import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { parseCookies } from "nookies"; // To parse cookies
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/home/category";
import { BsArrowRight } from "react-icons/bs";
import {
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
  gamingSwiper,
} from "@/data/home";
import axios from "axios";
import db from "@/utils/db";
import Product from "@/models/Product";

import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "@/components/productsSwiper";
import ProductCard from "@/components/productCard";
import RecentlyViewed from "@/components/home/recentlyviewed/RecentlyViewed";

export default function Home({ country, products, recentlyViewedProducts }) {
  // console.log(products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />

          {session && <RecentlyViewed products={recentlyViewedProducts} />}

          <ProductsSwiper header="All Products" products={women_swiper} />

          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="linear-gradient(120deg, #ffb6c1 0%, #ffd1dc 100%)"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="linear-gradient(120deg, #a0a0a0 0%, #d3d3d3 100%)"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="linear-gradient(120deg, #b8de6f 0%, #f9f871 100%)"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="linear-gradient(120deg, #7f7fd5 0%, #86a8e7 100%)"
            />
          </div>

          <ProductsSwiper
            products={gamingSwiper}
            header="For Gamers"
            bg="linear-gradient(120deg, #000000 0%, #ff0000 100%)"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House Improvement"
            bg=""
          />
          {/* {session && <RecentlyViewed products={recentlyViewedProducts} />} */}
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.IP_REGISTRY_API_KEY}`)
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      // console.log(err);
    });
  // Fetch recently viewed products
  const { req } = context;
  const cookies = parseCookies({ req });
  let recentIds = JSON.parse(cookies["recent-ids"] || "[]");
  recentIds = recentIds.reverse(); // Reverse the order of IDs
  const recentlyViewedProducts = await Product.find({ _id: { $in: recentIds } })
    .lean()
    .select("brand name slug images price");

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      recentlyViewedProducts: JSON.parse(
        JSON.stringify(recentlyViewedProducts)
      ),
      country: {
        name: "India",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/in.svg",
      },
    },
  };
}
