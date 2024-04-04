import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Header />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer />
    </>
  );
}
