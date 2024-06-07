import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import User from "@/models/User";
import Cart from "@/models/Cart";
import auth from "@/middleware/auth";

const router = createRouter().use(auth);

router.put(async (req, res) => {
  try {
    db.connectDb();
    const { paymentMethod } = req.body;
    const user = await User.findById(req.user);
    await user.updateOne(
      {
        defaultPaymentMethod: paymentMethod,
      },
      { returnOriginal: false }
    );
    db.disconnectDb();
    return res.json({ paymentMethod: user.defaultPaymentMethod });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
