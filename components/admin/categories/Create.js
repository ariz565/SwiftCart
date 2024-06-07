import { Form, Formik } from "formik";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AdminInput from "@/components/inputs/adminInput";
import styles from "./styles.module.scss";

export default function Create({ setCategories }) {
  // State for category name ---------------------
  const [name, setName] = useState("");
  // Yup validation schema -------------------------
  const validate = Yup.object({
    name: Yup.string()
      .required("Category name is required.")
      .min(2, "Category name must be bewteen 2 and 30 characters.")
      .max(30, "Category name must be bewteen 2 and 30 characters."),
    /*.matches(
        /^[a-zA-Z\s]*$/,
        "Numbers and special charcters are not allowed."
      ) */
  });
  // Submit handler -------------------------------
  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/category", { name });
      setCategories(data.categories);
      setName("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // Return component -----------------------------
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Create a Category</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="Category name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add Category</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
