// pages/api/product/[id].js
import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";

const router = createRouter();

router.get(async (req, res) => {
  try {
    await db.connectDb();
    const { id, style = 0, size = 0 } = req.query;

    if (!id) {
      throw new Error("Product ID is required");
    }

    const product = await Product.findById(id).lean();
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (
      !product.subProducts[style] ||
      !product.subProducts[style].sizes[size]
    ) {
      throw new Error("Invalid style or size");
    }

    let subProduct = product.subProducts[style];
    let productSize = subProduct.sizes[size];
    let discountPercentage = subProduct.discount || 0;
    let priceBefore = productSize.price;
    let discountAmount = priceBefore * (discountPercentage / 100);
    let price = priceBefore - discountAmount;

    return res.status(200).json({
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: subProduct.sku,
      brand: product.brand,
      category: product.category,
      subCategories: product.subCategories,
      shipping: product.shipping,
      images: subProduct.images,
      color: subProduct.color,
      size: productSize.size,
      price,
      priceBefore,
      quantity: productSize.qty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
