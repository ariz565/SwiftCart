import Header from "./Header";
import Menu from "./Menu";
import User from "./User";
import Offers from "./offers";
import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import { useSession } from "next-auth/react";

export default function Main() {
  const { data: session } = useSession();
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
}
