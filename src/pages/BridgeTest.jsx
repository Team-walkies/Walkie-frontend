import React, { useEffect } from "react";

const BridgeTest = () => {
  useEffect(() => {
    //android
    if (window.객체명) {
      window.객체명.약속된함수(data);
    }

    //ios
    if (window.webkit.messageHandlers.객체명) {
      window.webkit.messageHandlers.객체명.약속된함수(data);
    }
  }, []);

  const handlePostData = (event) => {
    // 보안상, 메시지를 보낸 origin을 확인할 수 있음
    if (event.origin !== "https://your-mobile-app-origin.com") {
      return; // 보안상 확인
    }

    const data = event.data;

    if (data && data.EVENT) {
      console.log("모바일 앱에서 받은 데이터:", data);

      // 데이터 기반으로 필요한 작업 처리
      if (data.EVENT === "stepCount") {
        console.log("걸음 수:", data.DATA.steps);
      }
    }
  };

  // 웹 페이지가 로드될 때 모바일 앱에서 보낸 데이터 처리
  useEffect(() => {
    // 메시지를 수신하는 이벤트 리스너 등록
    window.addEventListener("message", handlePostData);

    return () => {
      // 컴포넌트가 언마운트되면 이벤트 리스너 제거
      window.removeEventListener("message", handlePostData);
    };
  }, []);

  return <h1>BridgeTest</h1>;
};

export default BridgeTest;
