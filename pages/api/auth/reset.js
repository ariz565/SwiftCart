import { createRouter } from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken, createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";

const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id, password } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This Account does not exist." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });
    res.status(200).json({ email: user.email });
    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
