import styles from "@/styles/browse.module.scss";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import { filterArray, randomize, removeDuplicates } from "@/utils/arrays_utils";
import Header from "@/components/header";
import Link from "next/link";
import ProductCard from "@/components/productCard";
import CategoryFilter from "@/components/browse/categoryFilter";
import SizesFilter from "@/components/browse/sizesFilter";
import ColorsFilter from "@/components/browse/colorsFilter";
import BrandsFilter from "@/components/browse/brandsFilter";
import StylesFilter from "@/components/browse/stylesFilter";
import PatternsFilter from "@/components/browse/patternsFilter";
import MaterialsFilter from "@/components/browse/materialsFilter";
import GenderFilter from "@/components/browse/genderFilter";
import HeadingFilters from "@/components/browse/headingFilters";

export default function browse({
  categories,
  subCategories,
  products,
  sizes,
  colors,
  brands,
  stylesData,
  patterns,
  materials,
}) {
  return (
    <div className={styles.browse}>
      <Header />
      <div className={styles.browse__container}>
        <div className={styles.browse__path}>Home / Browse</div>
        <div className={styles.browse__tags}>
          {categories.map((c) => (
            <Link href="" key={c._id} legacyBehavior>
              <a>{c.name}</a>
            </Link>
          ))}
        </div>
        <div className={styles.browse__store}>
          <div
            className={`${styles.browse__store_filters} ${styles.scrollbar}`}
          >
            <button className={styles.browse__clearBtn}>Clear All (3)</button>
            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
            />
            <SizesFilter sizes={sizes} />
            <ColorsFilter colors={colors} />
            <BrandsFilter brands={brands} />
            <StylesFilter data={stylesData} />
            <PatternsFilter patterns={patterns} />
            <MaterialsFilter materials={materials} />
            <GenderFilter />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters />
            <div className={styles.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  db.connectDb();
  let productsDb = await Product.find().sort({ createdAt: -1 }).lean();
  let products = randomize(productsDb);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();
  let colors = await Product.find().distinct("subProducts.color.color");
  let brandsDb = await Product.find().distinct("brand");
  let sizes = await Product.find().distinct("subProducts.size.size");
  let details = await Product.find().distinct("details");
  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);
  // console.log(materials);
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(productsDb)),
      sizes,
      colors,
      brands,
      stylesData: styles,
      patterns,
      materials,
    },
  };
}
