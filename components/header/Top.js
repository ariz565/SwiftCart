import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MdSecurity } from "react-icons/md";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import { HiHeart } from "react-icons/hi";
import { FaHandsHelping } from "react-icons/fa";
import { RiCustomerServiceFill, RiAccountPinCircleFill } from "react-icons/ri";

export default function Top({ country }) {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Image src={country?.flag} width={20} height={20} alt="Flag" />
            <span>{country?.name} /IN</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <RiCustomerServiceFill />
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <FaHandsHelping />
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <HiHeart />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              <li>
                <div className={styles.flex}>
                  <Image
                    src={session.user.image}
                    width={20}
                    height={20}
                    alt="User"
                  />
                  <span>{session.user.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
