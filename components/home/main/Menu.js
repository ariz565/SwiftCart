import Link from "next/link";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";

import styles from "./styles.module.scss";
import { menuArray } from "@/data/home";
import { AiFillCloseSquare } from "react-icons/ai";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <ul>
        <a className={styles.menu__header}>
          <MdDashboard size={25} />
          CATEGORIES
          <button className={styles.menu__header_btn}>
            <AiFillCloseSquare size={20} />
          </button>
        </a>
        <div className={styles.menu__list}>
          {menuArray.map((item, index) => (
            <li className={styles.menu__item} key={index}>
              <Link href={`/browse?category=${item.link}`}>
                {/* <div className={styles.menu__item_img}>
                  <Image
                    fill={true}
                    style={{ objectFit: "cover" }}
                    src={`/categories/${item.images}`}
                    alt={item.name}
                  />
                </div> */}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Menu;
