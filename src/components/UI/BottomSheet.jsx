import React from "react";
import styled from "styled-components";
import reviewIcon from "../../assets/icons/ic_review.png";
import exploreIcon from "../../assets/icons/ic_explore.png";
import visitorsIcon from "../../assets/icons/ic_visitors.png";

// 전체 바텀시트
const Wrapper = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 44px);
  z-index: 100;
  box-shadow:
    0px 4px 26px rgba(0, 0, 0, 0.1),
    0px 1px 3px rgba(0, 0, 0, 0.08);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

// 위쪽 스와이프 바
const Swipe = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;

  div {
    width: 44px;
    height: 4px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.gray200};
  }
`;

// 콘텐츠 래퍼
const ContentWrap = styled.div`
  padding: 20px 16px;
  align-items: center;
`;

// 장소 정보 섹션
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

// 아이콘 섹션
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

// 사진 섹션 (가로 스크롤 가능)
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

// 리뷰 전체 감싸는 div
const ReviewWrap = styled.div`
  padding: 20px 16px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 리뷰 한 개 박스
const ReviewBox = styled.div`
  background-color: var(--gray-50);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 블루 버튼
const BlueBtn = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.colors.blue300};
  padding: 15px 0;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const BottomSheet = () => {
  return (
    <Wrapper>
      <Swipe>
        <div></div>
      </Swipe>
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
            <span className="b2" style={{ color: "var(--gray-700)" }}>
              방문자
            </span>
            <h6 style={{ color: "var(--gray-700)" }}>32명</h6>
          </MiddleBox>
          <MiddleBox>
            <img src={reviewIcon} alt="리뷰" />
            <span className="b2" style={{ color: "var(--gray-700)" }}>
              리뷰
            </span>
            <h6 style={{ color: "var(--gray-700)" }}>5개</h6>
          </MiddleBox>
          <MiddleBox>
            <img src={exploreIcon} alt="탐색" />
            <span className="b2" style={{ color: "var(--gray-700)" }}>
              나의 탐험
            </span>
            <h6 style={{ color: "var(--gray-700)" }}>미완료</h6>
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

        <BlueBtn>
          <span className="b1" style={{ color: "white" }}>
            출발하기
          </span>
        </BlueBtn>
      </ContentWrap>
    </Wrapper>
  );
};

export default BottomSheet;
