import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
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

export default function Home({ country, products }) {
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
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper
            products={gamingSwiper}
            header="For Gamers"
            bg="#5a31f4"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House Improvement"
            bg=""
          />
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.IP_REGISTRY_API_KEY}`)
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: {
        name: "India",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/in.svg",
      },
    },
  };
}
