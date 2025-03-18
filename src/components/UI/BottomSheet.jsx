import React, { useEffect, useState } from "react";
import styled from "styled-components";
import reviewIcon from "../../assets/icons/ic_review.png";
import exploreIcon from "../../assets/icons/ic_explore.png";
import visitorsIcon from "../../assets/icons/ic_visitors.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import x from "../../assets/icons/x.png";
import { useSetRecoilState } from "recoil";
import { destinationState } from "../../utils/atoms";

const Wrapper = styled(motion.div)`
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.expanded ? "calc(100%)" : "300px")};
  z-index: 100;
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
  position: relative;
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
  /* margin-bottom: 20px; */
  h4 {
    min-height: 20px;
  }
`;
const Middle = styled.div`
  padding: 8px 0;
  background-color: var(--gray-50);
  margin-top: 16px;
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
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  gap: 8px;
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
  padding: 20px 0px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ReviewBox = styled.div`
  /* background-color: var(--gray-50); */
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 2px solid var(--gray-100);
`;
const BlueBtn = styled.button`
  width: calc(100% - 32px);
  background-color: ${(props) => props.theme.colors.blue300};
  padding: 15px 0;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  position: fixed;
  bottom: 34px;
  left: 16px;
  box-sizing: border-box;
`;
const CloseBtn = styled.img`
  position: absolute;
  left: 16px;
  top: 8px;
  width: 28px;
  height: 28px;
`;

const EmptyView = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 50px;

  span {
    color: var(--gray-400);
  }
`;

const BottomSheet = ({ closeFn, name, loc, map, center }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [curLocation, setCurLocation] = useState("");
  const setDestination = useSetRecoilState(destinationState);

  const [meters, setMeters] = useState(0);

  useEffect(() => {
    if (window.google && window.google.maps && loc && center) {
      // LatLng 객체로 변환
      const origin = new window.google.maps.LatLng(center.lat, center.lng);
      const destination = new window.google.maps.LatLng(loc.lat, loc.lng);

      // 거리 계산
      const distanceInMeters =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          origin,
          destination
        );
      setMeters(Math.round(distanceInMeters)); // 미터 단위로 거리 저장

      console.log(
        `Calculated distance: ${Math.round(distanceInMeters)} meters`
      );
    }
  }, [loc, center]);

  const currentTime = new Date().toISOString();

  useEffect(() => {
    console.log(name, loc);
    const checkGoogleLoaded = () => {
      if (window.google && window.google.maps && loc) {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: loc.lat, lng: loc.lng };

        geocoder.geocode({ location: latlng }, (result, status) => {
          if (status == "OK") {
            setCurLocation(
              result[0].address_components[3]?.short_name +
                " " +
                result[0].address_components[2].short_name +
                " " +
                result[0].address_components[1].short_name +
                result[0].address_components[0].short_name
            );
          } else {
            console.log(console.error("아직 로드안됨"));
          }
        });
      }
    };

    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(interval);
        checkGoogleLoaded();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [loc]);

  return (
    <Wrapper expanded={expanded}>
      <Handle>
        {expanded ? (
          <CloseBtn
            src={x}
            onClick={() => {
              setExpanded(false);
            }}
          />
        ) : (
          <div onClick={() => setExpanded(!expanded)}></div>
        )}
      </Handle>
      <ContentWrap>
        <Info>
          <h3>{name}</h3>
          <h4 className="b2" style={{ color: "var(--gray-400)" }}>
            {curLocation} | {meters}m
          </h4>
          {/* <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span className="b2">여기서</span>
            <h6 style={{ margin: 0 }}>
              <b>31분 (2.5km)</b>
            </h6>
            <span className="b2">더 가야해요</span>
          </div> */}
        </Info>

        <Middle>
          <MiddleBox>
            <img
              style={{ width: "20px", height: "20px" }}
              src={visitorsIcon}
              alt="방문객"
            />
            <span className="b2" style={{ color: "var(--gray-700)" }}>
              방문자
            </span>
            <h6 style={{ color: "var(--gray-700)" }}>32명</h6>
          </MiddleBox>
          <MiddleBox>
            <img
              style={{ width: "20px", height: "20px" }}
              src={reviewIcon}
              alt="리뷰"
            />
            <span className="b2" style={{ color: "var(--gray-700)" }}>
              리뷰
            </span>
            <h6 style={{ color: "var(--gray-700)" }}>5개</h6>
          </MiddleBox>
          <MiddleBox>
            <img
              style={{ width: "20px", height: "20px" }}
              src={exploreIcon}
              alt="탐색"
            />
            <span className="b2" style={{ color: "var(--gray-700)" }}>
              나의 탐험
            </span>
            <h6 style={{ color: "var(--gray-700)" }}>미완료</h6>
          </MiddleBox>
        </Middle>

        <div
          style={{
            backgroundColor: "var(--gray-100)",
            width: "calc(100% + 32x)",
            height: "4px",
            marginTop: "20px",
          }}
        ></div>

        {expanded ? (
          <div>
            {/* 사진 섹션 */}
            <div style={{ padding: "20px 0px 24px 0px" }}>
              <h5>사진 3</h5>
              <ImgWrap style={{ display: expanded ? "flex" : "none" }}>
                {/* <div style={{ display: "flex", gap: "4px" }}>
                  <img src="/assets/photo1.jpg" />
                  <img src="/assets/photo1.jpg" />
                  <img src="/assets/photo1.jpg" />
                  <img src="/assets/photo2.jpg" />
                  <img src="/assets/photo3.jpg" />
                </div> */}
                <EmptyView>
                  <span>사진이 아직 없어요</span>
                </EmptyView>
              </ImgWrap>
            </div>

            {/* 리뷰 섹션 */}
            <ReviewWrap>
              <h5>리뷰 5</h5>
              <ReviewBox>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span className="b2">워키사랑</span>
                  <span className="c1" style={{ color: "var(--gray-400)" }}>
                    31분 전
                  </span>
                </div>
                <span className="b2">위에서 내려다보는 풍경이 너무 좋다</span>
              </ReviewBox>

              <ReviewBox>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span className="b2">닉네임몰랑가</span>
                  <span className="c1" style={{ color: "var(--gray-400)" }}>
                    1일 전
                  </span>
                </div>
                <span className="b2">
                  다 좋았는데 벌레가 좀 많음ㅠㅠ 산책하기엔 조금 비추천.. 담에
                  다시 안올거야
                </span>
              </ReviewBox>
              <EmptyView>
                <span>리뷰가 아직 없어요</span>
              </EmptyView>
            </ReviewWrap>
          </div>
        ) : null}

        <div
          onClick={() => {
            setDestination({
              name: name,
              startTime: currentTime,
              endTime: 0,
              meters: meters,
            });
            navigate(`/map/walk?lat=${loc.lat}&lng=${loc.lng}`, {
              state: { loc },
            });
          }}
        >
          <BlueBtn>
            <span className="b1" style={{ color: "white" }}>
              출발하기
            </span>
          </BlueBtn>
        </div>
      </ContentWrap>
    </Wrapper>
  );
};

export default BottomSheet;
