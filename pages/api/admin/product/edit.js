import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import auth from "@/middleware/auth";

const router = createRouter().use(auth);

router.put(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.body; // Assume product id is sent in the body
    const updatedData = req.body;

    // Ensure ID is provided
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Fetch the existing product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields
    for (const key in updatedData) {
      if (key !== "id" && updatedData.hasOwnProperty(key)) {
        product[key] = updatedData[key];
      }
    }

    // Save the updated product
    await product.save();
    await db.disconnectDb();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    await db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
