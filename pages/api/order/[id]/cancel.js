// api/order/[id]/cancel.js

import { createRouter } from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connectDb();
    const orderId = req.query.id;
    const order = await Order.findById(orderId);
    if (!order) {
      await db.disconnectDb();
      return res.status(404).json({ message: "Order not found" });
    }
    // Update order status to 'Cancelled'
    order.status = "Cancelled";
    await order.save();
    await db.disconnectDb();
    return res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error("Error canceling order:", error);
    await db.disconnectDb();
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router.handler();
