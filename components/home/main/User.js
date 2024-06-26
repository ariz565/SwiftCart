import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards, Navigation } from "swiper/modules";
import { userSwiperArray } from "../../../data/home";

export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <Image
        src="/images/userheader.jpg"
        alt="Default Img"
        width={500}
        height={140}
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <Image
              src={session.user?.image}
              width={500}
              height={50}
              alt="User"
            />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <Image
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              height={50}
              width={50}
              alt="Default"
            />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile" legacyBehavior>
              <a>
                <IoSettingsOutline />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <a>
                <HiOutlineClipboardList />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <a>
                <AiOutlineMessage />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <a>
                <BsHeart />
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <img
            src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
            alt=""
            className={styles.new}
          />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: "180px",
              height: "240px",
              marginTop: "1rem",
            }}
          >
            {userSwiperArray.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href="">
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <img
        src="../../../images/userHeader.jpg"
        alt=""
        className={styles.user__footer}
      />
    </div>
  );
}
