import React, { useState } from "react";
import styled from "styled-components";

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

const Title = styled.h3`
  margin-bottom: 20px;
`;

const CompleteButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  box-sizing: border-box; // This ensures padding is considered in the element's width
`;

const SpotName = styled.h4`
  color: var(--blue-400);
  font-weight: bold;
`;

const InfoItem = styled.div`
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
  margin-bottom: 20px;
  text-align: center;
`;

const RatingLabel = styled.p`
  font-size: 14px;
  color: #777;
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
`;

const CharacterCount = styled.p`
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 12px;
  color: #777;
  text-align: right;
`;

const Write = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  return (
    <Container>
      <Header>
        <CompleteButton>완료</CompleteButton>
      </Header>

      <Title>스팟에 도착했어요!</Title>
      <InfoSection>
        <SpotName>낙산공원</SpotName>
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
            <InfoValue>3.1km</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>걸음 수</InfoLabel>
            <InfoValue>3,429</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>이동 시간</InfoLabel>
            <InfoValue>30m</InfoValue>
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
              ★
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
          placeholder="해당 스팟에 대한 솔직한 리뷰를 남겨주세요.\n\n *프로필을 공개하면 리뷰가 다른 사람에게도 보여요\n (마이페이지 > 내 정보 > 프로필 공개)"
        />
        <CharacterCount>{review.length}/250</CharacterCount>
      </ReviewSection>
    </Container>
  );
};

export default Write;
