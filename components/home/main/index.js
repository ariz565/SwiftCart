import Header from "./Header";
import Menu from "./Menu";

import User from "./User";
import Offers from "./offers";
import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import { toggleMobileCate } from "@/store/mobileCateSlice";

export default function Main() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 950px)" });
  const { showMobileCate } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
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
