import styles from "@/components/profile/layout/styles.module.scss";
import Head from "next/head";
import Header from "@/components/header";
import Sidebar from "@/components/profile/sidebar";

export default function Layout({ session, tab, children }) {
  // ----------------- Profile Layout -----------------
  return (
    <div className={styles.layout}>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      <Header />
      <div className={styles.layout__container}>
        <Sidebar
          data={{
            ...session,
            tab,
          }}
        />
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}
