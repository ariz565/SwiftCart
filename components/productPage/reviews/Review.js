import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import { AiOutlineLike } from "react-icons/ai";

// Function to mask a given name part (either first or last name) if it is longer than 5 characters
function maskLongNamePart(namePart) {
  if (namePart.length <= 2) {
    return namePart[0] + '*';
  }
  return `${namePart[0]}***${namePart[namePart.length - 1]}`;
}

// Function to determine the display name based on privacy rules
function getDisplayName(fullName) {
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  if (firstName.length < 5) {
    return `${firstName} ${maskLongNamePart(lastName)}`;
  } else if (firstName.length > 5 && lastName.length < 5) {
    return lastName;
  } else {
    return `${maskLongNamePart(firstName)} ${maskLongNamePart(lastName)}`;
  }
}

// Review component
export default function Review({ review }) {
  const { name, image } = review.reviewBy ? review.reviewBy : { name: "", image: "" };
  
  // Get the display name with privacy rules applied
  const displayName = name ? getDisplayName(name) : "";

  return (
    <div className={styles.review}>
      <div className={styles.flex}>
        <div className={styles.review__user}>
          <h4>{displayName}</h4>
          <img src={image} alt="" />
        </div>
        <div className={styles.review__review}>
          <Rating
            name="half-rating-read"
            value={review.rating}
            precision={0.5}
            readOnly
            style={{ color: "#facf19", width: "100px" }}
          />
          <p>{review.review}</p>
          <p>
            <span>Overall Fit:</span>
            {review.fit}
            &nbsp;&nbsp;
            <span>Size:</span>
            {review.size}
            &nbsp;&nbsp;
            <div className={styles.flex}>
              <img
                src={review.style.image}
                alt=""
                className={styles.review__img}
              />
            </div>
          </p>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.review__images}>
          {review.images.length > 0 &&
            review.images.map((img, index) => (
              <img key={index} src={img?.url} alt="" />
            ))}
        </div>
        <div className={styles.review__extra}>
          <div className={styles.review__extra_likes}>
            {review.likes && review.likes?.likes}
            <AiOutlineLike />
          </div>
          <div className={styles.review__extra_date}>
            {review?.updatedAt?.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
}
