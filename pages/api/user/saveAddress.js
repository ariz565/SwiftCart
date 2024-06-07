import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import User from "@/models/User";
import Cart from "@/models/Cart";
import auth from "@/middleware/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await db.connectDb();
      const { address, user_id } = req.body;

      const user = await User.findById(user_id);

      let addresses = [];

      for (let i = 0; i < user.address.length; i++) {
        const temp_address = { ...user.address[i].toObject(), active: false };
        addresses.push(temp_address);
      }

      const newAddress = { ...address, active: true };

      //Dùng unshift để đẩy lên đầu mảng
      addresses.unshift(newAddress);

      await user.updateOne({ address: addresses });

      res.json(addresses);
      await db.disConnectDb();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
