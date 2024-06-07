// pages/api/admin/product/[id].js

import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import auth from "@/middleware/auth";

const router = createRouter().use(auth);

router.put(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;
    const { name, description, subProducts } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.subProducts = subProducts;

    await product.save();
    await db.disconnectDb();
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
