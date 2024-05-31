import { useState } from "react";
import Link from "next/link";
import slugify from "slugify";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { signOut } from "next-auth/react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";

export default function SidebarItem({ item, visible, index }) {
  
  const [show, setShow] = useState(visible);
  const router = useRouter();

  return (
    <li className={styles.sidebar__item}>
      {item.heading == "Sign out" ? (
        <b onClick={() => signOut()}>Sign out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
        </b>
      )}

      
      {show && (
        <ul>
          {item.links.map((link, i) => (
            <>
              {link.link.startsWith("/profile/orders") ? (
                <li
                  className={
                    (router.query.q?.split("__")[0] || "") ==
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}${link.filter ? `__${link.filter}` : ""}`}
                  >
                    <input
                      type="radio"
                      name="order"
                      id={link.name}
                      checked={
                        (router.query.q?.split("__")[0] || "") ==
                        slugify(link.name, { lower: true })
                      }
                    />
                    <label htmlFor={link.name}>{link.name}</label>
                  </Link>
                </li>
              ) : (
                <li
                  className={
                    (router.query.q || "") ==
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}`}
                  >
                    <input
                      type="radio"
                      name="order"
                      id={link.name}
                      checked={
                        (router.query.q || "") ==
                        slugify(link.name, { lower: true })
                      }
                    />
                    <label htmlFor={link.name}>{link.name}</label>
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </li>
  );
}
