import { createRouter } from "next-connect";
import db from "@/utils/db";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";
import User from "../../../models/User";
import { ObjectId } from "mongodb";

const router = createRouter().use(auth).use(admin);

router.delete(async (req, res) => {
  try {
    const { user_id } = req.body;  // Expect the user ID in the request body
    db.connectDb();
    
    if (!ObjectId.isValid(user_id)) {
      db.disconnectDb();
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const result = await User.findByIdAndDelete(user_id);
    
    db.disconnectDb();

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User has been deleted successfully",
      users: await User.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
