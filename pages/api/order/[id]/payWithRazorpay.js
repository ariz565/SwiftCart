import { createRouter } from "next-connect";
import auth from "../../../../middleware/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay Key Secret
});

export default async function handler(req, res) {
  const { id } = req.query; // Get the order ID from the URL
  const { amount } = req.body; // Amount should be sent from the frontend

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert amount to paise
      currency: "INR",
      receipt: id,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
}
