import styled from "styled-components";

import React from "react";
import { useNavigate } from "react-router-dom";

const CloseModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  background: rgba(0, 0, 0, 0.6); // Optional: background shading
`;

const CloseWrap = styled.div`
  position: fixed;
  top: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 280px;
  /* height: 150px; */
  background-color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  justify-content: space-around;
  top: 50%; /* 중앙 정렬을 위해 50% */
  left: 50%; /* 중앙 정렬을 위해 50% */
  transform: translate(-50%, -50%); /* 중앙 정확히 배치 */
`;

const ModalBtn = styled.button`
  color: #f6f8fa;
  font-size: 14px;
  padding: 12px 24px 12px 24px;
  border-radius: 8px;
  width: 50%;
  border: none;
  cursor: pointer;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  margin-top: 20px;
`;
const Text = styled.h4`
  color: #f6f8fa;
  font-size: 20px;
  line-height: 32px;
  /* margin-bottom: 5px; */
`;

const CloseModal = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <CloseModalContainer onClick={onClose}>
      <CloseWrap onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: "center" }}>
          <h4 style={{ color: "#1C1E1F", fontSize: "18px" }}>
            리뷰 작성을 중단할까요?
          </h4>
          <Text className="b2" style={{ color: "#797982", fontSize: "12px" }}>
            리뷰는 언제든 다시 작성할 수 있어요
          </Text>
        </div>
        <BtnWrap>
          <ModalBtn
            style={{ backgroundColor: "var(--gray-100)" }}
            onClick={() => {
              onClose();
            }}
          >
            <span style={{ color: "var(--gray-500)" }}>뒤로가기</span>
          </ModalBtn>
          <ModalBtn
            style={{ backgroundColor: "var(--red-100)" }}
            onClick={() => {
              navigate("/search");
            }}
          >
            중단하기
          </ModalBtn>
        </BtnWrap>
      </CloseWrap>
    </CloseModalContainer>
  );
};

export default CloseModal;
