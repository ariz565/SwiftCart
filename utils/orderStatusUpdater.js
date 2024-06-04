// orderStatusUpdater.js
import db from "@/utils/db";
import Order from "@/models/Order";

// Define a function to update order status based on predefined rules
export const updateOrderStatusAutomatically = async () => {
  try {
    await db.connectDb();
    const orders = await Order.find({
      status: { $nin: ["Completed", "Cancelled"] },
    }); // Exclude Completed and Cancelled orders
    for (const order of orders) {
      let status = order.status;
      const elapsedTime = Date.now() - order.createdAt;
      if (order.isPaid) {
        // If the order is paid
        if (status === "Not Processed") {
          // Only change status if it's currently Unprocessed
          status = "Processing"; // Change status to Processing
        } else if (
          status === "Processing" &&
          elapsedTime >= 2 * 60 * 60 * 1000
        ) {
          // Change status to Dispatched if it's Processing and elapsed time is more than 2 hours
          status = "Dispatched";
        }
      } else {
        // If the order is unpaid
        if (status !== "Not Processed") {
          // Only change status if it's not already Unprocessed
          status = "Not Processed"; // Change status to Unprocessed
        }
      }
      if (status !== order.status) {
        order.status = status;
        await order.save();
        console.log(`Order ${order._id} status updated to ${status}`);
      }
    }
    await db.disconnectDb();
  } catch (error) {
    console.error("Error updating order status automatically:", error);
    await db.disconnectDb();
  }
};

// Optionally, schedule the function to run periodically (e.g., every hour)
// setInterval(updateOrderStatusAutomatically, 60 * 60 * 1000); // Uncomment this line if you want to run the function periodically
