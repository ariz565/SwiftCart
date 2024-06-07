import Product from "@/models/Product";
import User from "../../models/User";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import styles from "../../styles/product.module.scss";
import db from "@/utils/db";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MainSwiper from "@/components/productPage/mainSwiper";
import { useState, useEffect } from "react";
import Infos from "@/components/productPage/infos";
import Reviews from "@/components/productPage/reviews";
import BreadCrumb from "@/components/BreadCrumb";

export default function Products({ product }) {
  const [activeImg, setActiveImg] = useState("");
  const [selectedSize, setSelectedSize] = useState(0); // Default to the first size
  const country = {
    name: "India",
    flag: "https://cdn.ipregistry.co/flags/emojitwo/in.svg",
  };

  // Recently viewed products
  useEffect(() => {
    let recentIds = JSON.parse(localStorage.getItem("recent-ids")) || [];
    if (!recentIds.includes(product._id.toString())) {
      recentIds.unshift(product._id.toString());
    }
    const uniqueRecentIds = [...new Set(recentIds)].slice(0, 6); // Limit to 6 products
    localStorage.setItem("recent-ids", JSON.stringify(uniqueRecentIds));
  }, [product._id]);

  const handleSizeChange = (sizeIndex) => {
    setSelectedSize(sizeIndex);
  };

  const calculatePrice = (price, discount) => {
    return discount ? (price * (1 - discount / 100)).toFixed(2) : price;
  };

  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country={country} />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            <BreadCrumb
              category={product.category?.name}
              categoryLink={`/category/${product.category?.slug}`}
              subCategories={product.subCategories}
            />
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos
              product={product}
              setActiveImg={setActiveImg}
              selectedSize={selectedSize}
              handleSizeChange={handleSizeChange}
              calculatePrice={calculatePrice}
            />
          </div>
          <Reviews product={product} />
        </div>
      </div>
      <Footer country={country.name} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;

  db.connectDb();
  let product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();

  if (!product) {
    return {
      notFound: true,
    };
  }

  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes.map((s) => s.price).sort((a, b) => a - b);

  let newProduct = {
    ...product,
    style,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => p.color),
    priceRange: `From ₹${prices[0]} to ₹${prices[prices.length - 1]}.`,
    price: subProduct.discount
      ? (
          subProduct.sizes[size].price *
          (1 - subProduct.discount / 100)
        ).toFixed(2)
      : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      { percentage: calculatePercentage("5") },
      { percentage: calculatePercentage("4") },
      { percentage: calculatePercentage("3") },
      { percentage: calculatePercentage("2") },
      { percentage: calculatePercentage("1") },
    ],
    reviews: product.reviews.reverse(),
    allSizes: product.subProducts
      .flatMap((p) => p.sizes)
      .sort((a, b) => a.size - b.size)
      .filter(
        (element, index, array) =>
          array.findIndex((el2) => el2.size === element.size) === index
      ),
  };

  function calculatePercentage(num) {
    return (
      (product.reviews.reduce(
        (a, review) =>
          a +
          (review.rating === Number(num) ||
            review.rating === Number(num) + 0.5),
        0
      ) *
        100) /
      product.reviews.length
    ).toFixed(1);
  }

  db.disconnectDb();
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
