import React, { useState } from "react";
import styled from "styled-components";
import reviewIcon from "../../assets/icons/ic_review.png";
import exploreIcon from "../../assets/icons/ic_explore.png";
import visitorsIcon from "../../assets/icons/ic_visitors.png";
import { motion } from "framer-motion";
import useBottomSheet from "../../hooks/useBottomSheet";
import { MIN_Y, MAX_Y, BOTTOM_SHEET_HEIGHT } from "../../utils/btmSheetConfig";

const Wrapper = styled(motion.div)`
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${MAX_Y}px;
  z-index: 100;
  /* top: ${({ isOpen }) => (isOpen ? `${MIN_Y}px` : "382px")}; */
  box-shadow:
    0px 4px 26px rgba(0, 0, 0, 0.1),
    0px 1px 3px rgba(0, 0, 0, 0.08);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  transition: height 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const Handle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  min-height: 28px;
  cursor: pointer;

  div {
    width: 44px;
    height: 4px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.gray200};
  }
`;

const ContentWrap = styled.div`
  flex-grow: 1;
  padding: 20px 16px;
  align-items: center;
  overflow-y: auto;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Middle = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

const MiddleBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    margin-bottom: 8px;
    width: 36px;
    height: 36px;
  }
`;

const ImgWrap = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  gap: 4px;
  flex-direction: column;

  img {
    width: 120px;
    height: 120px;
    background-color: black;
    border-radius: 12px;
    object-fit: cover;
  }
`;

const ReviewWrap = styled.div`
  padding: 20px 16px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReviewBox = styled.div`
  background-color: var(--gray-50);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BlueBtn = styled.button`
  width: calc(100%-32px);
  background-color: ${(props) => props.theme.colors.blue300};
  padding: 15px 0;
  margin: 0px 10px;
  margin-bottom: 34px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  position: sticky;
  bottom: 0;
  left: 0;
`;

const BottomSheet = ({ name, location, closeFn }) => {
  const [expanded, setExpanded] = useState(false);
  const { sheet } = useBottomSheet();

  return (
    <Wrapper expanded={expanded} ref={sheet}>
      <Handle onClick={() => setExpanded(!expanded)}>
        <div></div>
      </Handle>
      <ContentWrap>
        <Info>
          <h3>낙산공원</h3>
          <h4 className="b2" style={{ color: "var(--gray-400)" }}>
            서울 종로구 낙산길 41
          </h4>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span className="b2">여기서</span>
            <h6 style={{ margin: 0 }}>
              <b>31분 (2.5km)</b>
            </h6>
            <span className="b2">더 가야해요</span>
          </div>
        </Info>

        <Middle>
          <MiddleBox>
            <img src={visitorsIcon} alt="방문객" />
            <span className="b2">방문자</span>
            <h6>32명</h6>
          </MiddleBox>
          <MiddleBox>
            <img src={reviewIcon} alt="리뷰" />
            <span className="b2">리뷰</span>
            <h6>5개</h6>
          </MiddleBox>
          <MiddleBox>
            <img src={exploreIcon} alt="탐색" />
            <span className="b2">나의 탐험</span>
            <h6>미완료</h6>
          </MiddleBox>
        </Middle>

        {/* 사진 섹션 */}
        <div style={{ padding: "20px 16px" }}>
          <h5>사진 3</h5>
          <ImgWrap>
            <div style={{ display: "flex", gap: "4px" }}>
              <img src="/assets/photo1.jpg" />
              <img src="/assets/photo1.jpg" />
              <img src="/assets/photo1.jpg" />
              <img src="/assets/photo2.jpg" />
              <img src="/assets/photo3.jpg" />
            </div>
          </ImgWrap>
        </div>

        {/* 리뷰 섹션 */}
        <ReviewWrap>
          <h5>리뷰 5</h5>
          <ReviewBox>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="b2">워키사랑</span>
              <span className="c1" style={{ color: "var(--gray-400)" }}>
                31분 전
              </span>
            </div>
            <span className="b2">위에서 내려다보는 풍경이 너무 좋다</span>
          </ReviewBox>

          <ReviewBox>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="b2">닉네임몰랑가</span>
              <span className="c1" style={{ color: "var(--gray-400)" }}>
                1일 전
              </span>
            </div>
            <span className="b2">
              다 좋았는데 벌레가 좀 많음ㅠㅠ 산책하기엔 조금 비추천.. 담에 다시
              안올거야
            </span>
          </ReviewBox>
        </ReviewWrap>
      </ContentWrap>
      <BlueBtn>출발하기</BlueBtn>
    </Wrapper>
  );
};

export default BottomSheet;
