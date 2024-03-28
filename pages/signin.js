import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/loginInput";
import styles from "@/styles/signin.module.scss";
import { Formik, Form } from "formik";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function signin() {
  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&apos;d be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best EShopping services in the world.
            </p>
            <Formik>
              {(form) => (
                <Form>
                  <LoginInput
                    icon="password"
                    placeholder="Enter your password"
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="India" />
    </>
  );
}
