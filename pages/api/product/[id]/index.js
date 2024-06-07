import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";

const router = createRouter({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ message: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: "Method not allowed" });
  },
});

router.get(async (req, res) => {
  try {
    await db.connectDb();
    const { id, style = 0, size = 0 } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const subProduct = product.subProducts[style];
    if (!subProduct) {
      return res.status(400).json({ message: "Invalid style" });
    }

    const productSize = subProduct.sizes[size];
    if (!productSize) {
      return res.status(400).json({ message: "Invalid size" });
    }

    const discountPercentage = subProduct.discount || 0;
    const priceBefore = productSize.price;
    const discountAmount = priceBefore * (discountPercentage / 100);
    const price = priceBefore - discountAmount;

    const productData = {
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
    };

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
