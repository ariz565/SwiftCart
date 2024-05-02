import { createRouter } from "next-connect";
import db from "@/utils/db";
import auth from "../../../middleware/auth";
import Category from "../../../models/Category";
import slugify from "slugify";
// import admin from "../../../middleware/admin";

// ------------------- Category Model -------------------
const router = createRouter().use(auth);
// ------------------- Category Model -------------------
router.post(async (req, res) => {
  try {
    const { name } = req.body;
    db.connectDb();
    const test = await Category.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Category already exist, Try a different name" });
    }
    await new Category({ name, slug: slugify(name) }).save();

    db.disconnectDb();
    res.json({
      message: `Category ${name} has been created successfully.`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});
// ------------------- Delete Category -------------------
router.delete(async (req, res) => {
  try {
    const { id } = req.body;
    db.connectDb();
    await Category.findByIdAndDelete(id);
    db.disconnectDb();
    return res.json({
      message: "Category has been deleted successfuly",
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ------------------- Update Category -------------------
router.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    db.connectDb();
    await Category.findByIdAndUpdate(id, { name });
    db.disconnectDb();
    return res.json({
      message: "Category has been updated successfuly",
      categories: await Category.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ------------------- Export Handler -------------------
export default router.handler();
