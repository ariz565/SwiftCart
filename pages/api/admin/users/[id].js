// pages/api/users/[id].js

import { createRouter } from "next-connect";
import User from "@/models/User";
import auth from "@/middleware/auth";
import db from "@/utils/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await db.connectDb();

  if (method === "DELETE") {
    try {
      await User.findByIdAndDelete(id);
      await db.disconnectDb();
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      await db.disconnectDb();
      return res.status(500).json({ message: "Error deleting user", error });
    }
  } else {
    await db.disconnectDb();
    return res.status(405).json({ message: "Method not allowed" });
  }
}
