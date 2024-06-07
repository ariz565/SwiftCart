import { createRouter } from "next-connect";
import User from "../../../models/User";
import Order from "../../../models/Order";
import Product from "../../../models/Product"; // Import the Product model
import db from "../../../utils/db";
import auth from "../../../middleware/auth";

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const user = await User.findById(req.user);

    // Iterate over each product in the order and update the stock quantity
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        await db.disconnectDb();
        return res.status(404).json({ message: `Product with ID ${item.product} not found` });
      }

      const subProduct = product.subProducts.find(sub => sub.color.color === item.color.color);
      if (!subProduct) {
        await db.disconnectDb();
        return res.status(404).json({ message: `Sub-product with color ${item.color.color} not found` });
      }

      const size = subProduct.sizes.find(size => size.size === item.size);
      if (!size) {
        await db.disconnectDb();
        return res.status(404).json({ message: `Size ${item.size} not found for color ${item.color.color}` });
      }

      // Check if enough stock is available
      if (size.qty < item.qty) {
        await db.disconnectDb();
        return res.status(400).json({ message: `Not enough stock for ${item.name}, size ${item.size}` });
      }

      // Update the stock quantity
      size.qty -= item.qty;
      await product.save();
    }

    // Create the new order
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();

    await db.disconnectDb();
    return res.json({
      order_id: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    await db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
