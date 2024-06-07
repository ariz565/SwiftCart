import db from "../../../utils/db";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await db.connectDb();
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalSales: { $sum: "$total" },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(200).json({ salesData });
}
