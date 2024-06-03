import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import User from "@/models/User";
import Cart from "@/models/Cart";
import auth from "@/middleware/auth";

async function handler(req, res) {
  try {
    await db.connectDb();
    const { user_id, address_id } = req.body;

    let user = await User.findById(user_id);

    let addresses = [];

    if (req.method === "PUT") {
      for (let i = 0; i < user.address.length; i++) {
        let temp_address = {};
        if (user.address[i]._id == address_id) {
          temp_address = { ...user.address[i].toObject(), active: true };

          addresses.unshift(temp_address);
        } else {
          temp_address = { ...user.address[i].toObject(), active: false };

          addresses.push(temp_address);
        }
      }

      await user.updateOne({ address: addresses }, { new: true });
    }

    res.json(addresses);

    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
