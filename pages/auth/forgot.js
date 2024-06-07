import Link from "next/link";
import { AiOutlineBackward } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/loginInput";
import HasIconButton from "@/components/buttons/hasIconBtn/HasIconButton";
import styles from "@/styles/forgot.module.scss";
import axios from "axios";
import DotLoaderSpinner from "../../components/loaders/dotLoader";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
  });

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", { email });
      setError("");
      setSuccess(data.message);
      setLoading(false);
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />
      <div className={styles.forgot}>
        <div className={styles.forgot__wrap}>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <AiOutlineBackward /> Back to login page
            </div>
            <p>Let us know your email to receive password reset link.</p>
          </div>
          <div className={styles.forgot__form}>
            <Formik
              enableReinitialize
              initialValues={{ email }}
              validationSchema={emailValidation}
              onSubmit={() => {
                forgotHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    icon="email"
                    placeholder="Type here if you remember it"
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className={styles.btnWrap}>
                    <HasIconButton type="submit">Submit</HasIconButton>
                  </div>
                  {success && !error && (
                    <span className={styles.success}>
                      <BsCheckCircleFill />
                      {success}
                    </span>
                  )}
                  {error && !success && (
                    <span className={styles.error}>
                      <MdCancel />
                      {error}
                    </span>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgot;
