import { createRouter } from "next-connect";
import auth from "../../../../middleware/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";
import User from "../../../../models/User";
import { sendEmail } from "@/utils/sendEmails";
import { orderConfirmationTemplate } from "@/emails/orderConfirmationTemplate";
import { Router, useRouter } from "next/router";

const router = createRouter().use(auth);


router.put(async (req, res) => {
  console.log("hello from api");
  await db.connectDb();
  const order = await Order.findById(req.query.id).populate({
    path: "user",
    model: User,
  });
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    if (order.paymentMethod === "cash") {
      order.status = "Processing";
    }
    const newOrder = await order.save();
    await db.disconnectDb();
    // Send email notification
    const emailSubject = "Order Payment Confirmation";
    const emailText = `Hello ${order.user.name},\n\nYour order with ID ${order._id} has been successfully paid.\n\nThank you for your purchase!\n\nBest regards,\nYour Company`;
    const emailUrl = `${process.env.BASE_URL}/order/${order._id}`; // Adjust the URL as needed
    sendEmail(
      order.user.email,
      emailUrl,
      emailText,
      emailSubject,
      orderConfirmationTemplate
    );
    console.log("Email sent.");

    // res.json({ message: "Order is paid and status updated.", order: newOrder });
    setTimeout(() => {
      res.json({
        message: "Order is paid and status updated.",
        order: newOrder,
        redirect: "/complete",
      });
    }, 3000);
  } else {
    await db.disconnectDb();
    res.status(404).json({ message: "Order is not found." });
  }
});

export default router.handler();
