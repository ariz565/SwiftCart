import styles from "./styles.module.scss";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import Image from "next/image";

export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to SwiftCart !</h4>
      {session ? (
        <div className={styles.flex}>
          <Image
            src={session.user.image}
            alt="Avatar"
            width={500}
            height={50}
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>Sign Out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary} onClick={() => signIn()}>
            Register
          </button>
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders?tab=1&q=all-orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address?tab=0&q=addresses">Address</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}
