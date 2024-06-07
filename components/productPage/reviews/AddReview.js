import Select from "./Select";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import Images from "./Images";
import { useDispatch } from "react-redux";
import { hideDialog, showDialog } from "@/store/DialogSlice";
import dataURItoBlob from "@/utils/dataURItoBlob";
import axios from "axios";
import DialogModal from "@/components/dialogModal";
import { uploadImages } from "@/requests/upload";
import { ClipLoader } from "react-spinners";

export default function AddReview({ product, setReviews }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // ------------------ Local States ------------------
  useEffect(() => {
    dispatch(hideDialog());
  }, []);
  // ------------------ -------------------------------
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [images, setImages] = useState([]);
  let uploaded_images = [];

  // ------------------ Handle Submit ------------------
  const handleSubmit = async () => {
    setLoading(true);
    let msgs = [];
    if (!size) {
      msgs.push({
        msg: "Please select a size !",
        type: "error",
      });
    }
    if (!style) {
      msgs.push({
        msg: "Please select a style !",
        type: "error",
      });
    }
    if (!fit) {
      msgs.push({
        msg: "Please select a fit !",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Please add a review !",
        type: "error",
      });
    }
    if (!rating) {
      msgs.push({
        msg: "Please select a rating !",
        type: "error",
      });
    }
    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: "Adding review error !",
          msgs,
        })
      );
    } else {
      if (images.length > 0) {
        let temp = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = "reviews images";
        let formData = new FormData();
        formData.append("path", path);
        temp.forEach((img) => {
          formData.append("file", img);
        });
        uploaded_images = await uploadImages(formData);
      }
      //  ------------------- API Call to update review -------------------
      const { data } = await axios.put(`/api/product/${product._id}/review`, {
        size,
        style,
        fit,
        rating,
        review,
        images: uploaded_images,
      });
      setReviews(data.reviews);
      setStyle("");
      setSize("");
      setFit("");
      setImages([]);
      setRating(0);
      setReview("");
    }
    setLoading(false);
  };

  return (
    <div className={styles.reviews__add}>
      <DialogModal />
      <div className={styles.reviews__add_wrap}>
        <div className={styles.flex} style={{ gap: "10px" }}>
          <Select
            property={size}
            text="Size"
            data={product.allSizes.filter((x) => x.size !== size)}
            handleChange={setSize}
          />

          <Select
            property={style}
            text="Style"
            data={product.colors.filter((x) => x !== style)}
            handleChange={setStyle}
          />

          <Select
            property={fit}
            text="How does it fit"
            data={fits.filter((x) => x !== fit)}
            handleChange={setFit}
          />
        </div>
        <Images images={images} setImages={setImages} />
        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        />
        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          precision={0.5}
          style={{ color: "#FACF19", fontSize: "3rem", width: "100px" }}
        />
        <button
          className={`${styles.login_btn} ${loading ? styles.disabled : ""}`}
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          Submit Review{" "}
          {loading && <ClipLoader loading={loading} color="#fff" />}
        </button>
      </div>
    </div>
  );
}

let fits = ["Small", "True to size", "Large"];
