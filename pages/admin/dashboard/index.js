import Layout from "@/components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";
import { Bounce, toast } from "react-toastify";

export default function dashboard() {
  return (
    <div>
      <Layout>
        <button
          onClick={() =>
            toast.error(
              "Na Tameez Hai Na Tehzeeb Apme Toh SDE Jese Koi Baat Hi Nahi Rahi",
              {
                transition: Bounce,
              }
            )
          }
        >
          Show Toast
        </button>
      </Layout>
    </div>
  );
}
