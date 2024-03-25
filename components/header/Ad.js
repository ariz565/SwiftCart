import Link from "next/link";
import styles from "./styles.module.scss";

export default function Ad() {
  return (
    <Link href="/browse">
      <div className={styles.ad}>

        {/* <img src="/ad.jpg" alt="Ad" /> */}
      </div>
    </Link>
  );
}
