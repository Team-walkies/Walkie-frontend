import React, { useState } from "react";
import styled from "styled-components";
import x from "../assets/icons/x.png";
import grayStar from "../assets/icons/ic_star_gray.png";
import blueStar from "../assets/icons/ic_star.png";
import spotIcon from "../assets/icons/ic_green.png";
import CloseModal from "../components/UI/CloseModal";
import { useRecoilValue } from "recoil";
import { destinationState } from "../utils/atoms";
import { metersToKms } from "../utils/calculate";

const Container = styled.div`
  /* max-width: 400px; */
  margin: 0 auto;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CloseBtn = styled.img`
  width: 28px;
  height: 28px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const CompleteButton = styled.h5`
  color: var(--blue-400);
  cursor: pointer;
  font-size: 14px;
`;

const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  box-sizing: border-box; // This ensures padding is considered in the element's width
`;

const SpotName = styled.h6`
  color: var(--blue-400);
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
`;

const InfoItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 5px 0;
`;

const InfoLabel = styled.p`
  font-size: 14px;
  color: #777;
`;

const InfoValue = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const RatingSection = styled.div`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  margin-bottom: 20px;
  text-align: center;
`;

const RatingLabel = styled.h6`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  color: black;
`;

const RatingStars = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Star = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#f1c40f" : "#ccc")};
`;
const ReviewSection = styled.div`
  width: 100%;
  /* border-radius: 12px; */
  position: relative;
  height: auto;
`;
const ReviewInput = styled.textarea`
  height: 233px;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  resize: none;
  line-height: 1.5;
  background-color: var(--gray-100);
  color: black;

  &::placeholder {
    color: var(--gray-400);
    white-space: pre-line;
  }

  &:focus {
    border-color: var(--blue-300); /* Blue color when focused */
    outline: none; /* Remove the default outline */
  }
`;
const CharacterCount = styled.p`
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 12px;
  color: #777;
  text-align: right;
`;

const StarIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Write = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const destInfo = useRecoilValue(destinationState);

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const calculateTimeDifferenceInMinutes = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const timeDifferenceInMilliseconds = end - start;
    const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60); // convert to minutes
    return Math.round(timeDifferenceInMinutes); // Round to the nearest minute
  };

  // Calculate the travel time in minutes
  const travelTimeInMinutes = calculateTimeDifferenceInMinutes(
    destInfo.startTime,
    destInfo.endTime
  );

  return (
    <Container>
      {isCloseModalOpen && (
        <CloseModal
          boldText={"리뷰 작성을 중단할까요?"}
          text={"리뷰는 언제든 다시 작성할 수 있어요"}
          grayFn={() => setIsCloseModalOpen(false)}
          redFn={() => {}}
        />
      )}
      <Header>
        <CloseBtn src={x} onClick={() => setIsCloseModalOpen(true)} />
        <CompleteButton>완료</CompleteButton>
      </Header>

      <Title>스팟에 도착했어요!</Title>
      <InfoSection>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={spotIcon}
            style={{ width: "16px", height: "16px", marginRight: "4px" }}
          />
          <SpotName>{destInfo.name}</SpotName>
        </div>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--gray-200)",
            margin: "12px 0",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <InfoItem>
            <InfoLabel>이동 거리</InfoLabel>
            <InfoValue>{metersToKms(destInfo.meters)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>걸음 수</InfoLabel>
            <InfoValue>3,429</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>이동 시간</InfoLabel>
            <InfoValue>{travelTimeInMinutes}분</InfoValue>
          </InfoItem>
        </div>
      </InfoSection>

      <RatingSection>
        <RatingLabel>코스는 어땠나요?</RatingLabel>
        <RatingStars>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              active={index < rating}
              onClick={() => handleRatingClick(index)}
            >
              <img
                src={index < rating ? blueStar : grayStar}
                alt="star"
                style={{ width: "24px", height: "24px" }}
              />
            </Star>
          ))}
        </RatingStars>
      </RatingSection>

      <ReviewSection>
        <ReviewInput
          className="b2"
          value={review}
          onChange={handleReviewChange}
          maxLength={250}
          placeholder="해당 스팟에 대한 솔직한 리뷰를 남겨주세요.&#13;&#10;&#13;&#10; *프로필을 공개하면 리뷰가 다른 사람에게도 보여요&#13;&#10; (마이페이지 > 내 정보 > 프로필 공개)"
        />
        <CharacterCount>{review.length}/250</CharacterCount>
      </ReviewSection>
    </Container>
  );
};

export default Write;
