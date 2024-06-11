import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import styles from "@/styles/EditProduct.module.scss";

export default function EditProduct({ product, categories }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [subProducts, setSubProducts] = useState(product.subProducts);
  const router = useRouter();

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/admin/product/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, subProducts }),
      });
      if (response.ok) {
        router.push("/admin/dashboard/product/all");
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className={styles.editProduct}>
        <h1>Edit Product</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <h2>Sub Products</h2>
          {subProducts.map((subProduct, index) => (
            <div key={index}>
              <h3>Style {index + 1}</h3>
              <label>Color:</label>
              <input
                type="text"
                value={subProduct.color.color}
                onChange={(e) =>
                  setSubProducts((prev) => {
                    const updated = [...prev];
                    updated[index].color.color = e.target.value;
                    return updated;
                  })
                }
              />
              <h4>Sizes</h4>
              {subProduct.sizes.map((size, sizeIndex) => (
                <div key={sizeIndex}>
                  <label>Size:</label>
                  <input
                    type="text"
                    value={size.size}
                    onChange={(e) =>
                      setSubProducts((prev) => {
                        const updated = [...prev];
                        updated[index].sizes[sizeIndex].size = e.target.value;
                        return updated;
                      })
                    }
                  />
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={size.qty}
                    onChange={(e) =>
                      setSubProducts((prev) => {
                        const updated = [...prev];
                        updated[index].sizes[sizeIndex].qty = e.target.value;
                        return updated;
                      })
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  await db.connectDb();
  const product = await Product.findById(id).lean();
  const categories = await Category.find({}).lean();
  await db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
