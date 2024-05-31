import { createRouter } from "next-connect";
import auth from "@/middleware/auth";
import db from "@/utils/db";
import User from "@/models/User";

const router = createRouter().use(auth);

router.patch(async (req, res) => {
  try {
    const { id } = req.query;
    await db.connectDb();

    const user = await User.findById(req.user).populate("wishlist.product");
    const newWishlist = [...user.wishlist].filter(
      (item) => item._id.toString() != id
    );

    user.wishlist = newWishlist;

    await user.save();
    await db.disconnectDb();
    res.status(200).json(newWishlist);
  } catch (error) {
    await db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
