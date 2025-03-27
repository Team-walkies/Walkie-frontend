import axios from "axios";
import { BASE_URL } from "./APIconfig";

const token = localStorage.getItem("accessToken");

export const patchReview = async (reviewId, reviewText, rating) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/reviews/${reviewId}`,
      {
        review: reviewText,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`리뷰 ${reviewId}번 수정 성공`);
  } catch (error) {
    console.log(`리뷰 ${reviewId}번 수정 실패 :`, error);
  }
};
