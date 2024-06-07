import { createRouter } from "next-connect";
import auth from "../../../../middleware/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    await db.connectDb();
    console.log(req.body);
    const { amount, id } = req.body;
    const order_id = req.query.id;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "inr",
      description: "SwiftCart Store",
      payment_method: id,
      confirm: true,
      return_url: `${req.headers.origin}/success`, // URL for redirection after successful payment
    });

    const order = await Order.findById(order_id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        email_address: paymentIntent.receipt_email,
      };
      await order.save();
      res.json({
        success: true,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }

    db.disconnectDb();
  } catch (error) {
    console.log(error);
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
