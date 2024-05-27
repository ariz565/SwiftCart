import { createRouter } from "next-connect";
import Category from "@/models/Category";
import SubCategory from "../../../models/SubCategory";
import db from "../../../utils/db";
import admin from "@/middleware/admin";
import auth from "@/middleware/auth";
import slugify from "slugify";

// ------------------- Category Model -------------------
const router = createRouter().use(auth).use(admin);
// ------------------- Category Model -------------------
router.post(async (req, res) => {
  try {
    await db.connectDb();

    const { name, parent } = req.body;
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }
    await new SubCategory({ name, parent, slug: slugify(name) }).save();

    db.disconnectDb();

    res.status(201).json({
      subCategories: await SubCategory.find({})
        .populate({ path: "parent", model: Category })
        .sort({ updatedAt: -1 }),
      message: `Sub-Category ${name} has been created successfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ------------------- Delete Category -------------------
router.delete(async (req, res) => {
  try {
    const { id } = req.body;
    db.connectDb();
    await SubCategory.findByIdAndDelete(id);
    db.disconnectDb();
    return res.json({
      message: "SubCategory has been deleted successfuly",
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ------------------- Update Category -------------------
router.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;
    db.connectDb();
    await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name),
    });
    db.disconnectDb();
    return res.json({
      message: "SubCategory has been updated successfuly",
      subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//------------------- Get SubCategories -------------------
router.get(async (req, res) => {
  try {
    await db.connectDb();

    const { category } = req.query;
    // console.log(category);
    if (!category) {
      return res.json([]);
    }

    const results = await SubCategory.find({ parent: category }).select("name");
    // console.log(results);
    await db.disconnectDb();
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ------------------- Export Handler -------------------
export default router.handler();
