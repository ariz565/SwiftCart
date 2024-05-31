import Head from "next/head";
import styles from "@/components/profile/layout/styles.module.scss";
import Header from "@/components/header";
import Sidebar from "./Sidebar";

export default function Layout({ session, tab, children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{session?.name}</title>
      </Head>
      <Header />
      <div className={styles.layout__container}>
        <Sidebar data={{ image: session?.image, name: session?.name, tab }} />
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}
