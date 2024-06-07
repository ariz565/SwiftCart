import auth from "@/middleware/auth";
import Product from "@/models/Product";
import db from "@/utils/db";
import { createRouter } from "next-connect";

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    const { ids } = req.body;

    await db.connectDb();

    const recentProducts = await Product.find({ _id: ids })
      .select("category name rating slug subProducts _id shipping")
      .lean();

    const reduceImagesProducts = recentProducts.map((p) => {
      const newSubProducts = p.subProducts.map((s) => {
        return { ...s, images: s.images.slice(0, 2) };
      });

      return { ...p, subProducts: newSubProducts };
    });

    await db.disconnectDb();

    res.status(200).json(reduceImagesProducts);
  } catch (error) {
    await db.disconnectDb();
    res.status(200).json({ message: error.message });
  }
});

export default router.handler();
