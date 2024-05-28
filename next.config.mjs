import path from "path";
import { fileURLToPath } from "url";
// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./base.scss";`,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "ae01.alicdn.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
