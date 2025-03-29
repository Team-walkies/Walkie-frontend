import axios from "axios";
import { BASE_URL } from "./APIconfig";

const token = localStorage.getItem("accessToken");

//주변 스팟 검색
export const findNearbySpots = async (latitude, longitude) => {
  // console.log(latitude, longitude);
  try {
    const response = await axios.post(
      `${BASE_URL}/spots/nearby`,
      {
        latitude,
        longitude,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("근처 스팟 조회 성공 : ", response.data);
    return response.data.data;
  } catch (error) {
    console.log("근처 스팟 조회 실패", error);
  }
};

//스팟 n번 상세정보 조회
export const getSpotDetail = async (spotId) => {
  try {
    const response = await axios.get(`${BASE_URL}/spots/${spotId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`스팟 ${spotId}번 조회 성공 : `, response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(`스팟 ${spotId}번 정보 조회 실패 : `, error);
  }
};

//스팟 ???번에 대한 리뷰들 조회
export const getSpotReviews = async (spotId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/reviews/spots?spotId=${spotId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(
      `스팟 ${spotId}번 리뷰 조회 성공 : `,
      response.data.data.reviews
    );
    return response.data.data.reviews;
  } catch (error) {
    console.log(`스팟 ${spotId}번 리뷰 조회 실패 : `, error);
  }
};
