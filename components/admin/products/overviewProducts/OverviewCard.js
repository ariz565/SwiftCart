import Link from "next/link";
import styles from "./overviewCard.module.scss";

export default function OverviewCard({ metrics }) {
  return (
    <div className={styles.overviewCard}>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>Total Products:</span>
        <span className={styles.metricValue}>{metrics.totalProducts}</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>Out of Stock:</span>
        <Link href="/admin/dashboard/product/outOfStock" legacyBehavior>
          <a className={styles.metricValue}>{metrics.outOfStockCount}</a>
        </Link>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>
          Low Stock (Less than 20 qty):
        </span>
        <Link href="/admin/dashboard/product/lowStock" legacyBehavior>
          <a className={styles.metricValue}>{metrics.lowStockCount}</a>
        </Link>
      </div>
    </div>
  );
}
