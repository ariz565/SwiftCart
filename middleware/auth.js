import { getToken } from "next-auth/jwt";

const auth = async (req, res, next) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (token) {
    req.user = token.sub;

    next();
  } else {
    res.status(401).json({ message: "Have not signed in yet!" });
  }
};

export default auth;
