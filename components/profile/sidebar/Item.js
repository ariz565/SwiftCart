import { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Link from "next/link";
import slugify from "slugify";
import styles from "./styles.module.scss";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";

export default function Item({ item, visible, index }) {
  // ----------------- Variables -----------------
  const [show, setShow] = useState(visible);
  const router = useRouter();

  // ----------------- Return -----------------
  return (
    <li>
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
                    })}__${link.filter}`}
                    legacyBehavior
                  >
                    <a>{link.name}</a>
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
                    legacyBehavior
                  >
                    <a>{link.name}</a>
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
