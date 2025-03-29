export const sendDataToMobile = (message) => {
  // 웹에서 모바일로 메시지 보내기
  const param = {
    EVENT: "event_name",
    DEVICE: "AOS", // AOS 또는 iOS
    DATA: {
      stepCount: 1000,
      additionalData: null,
    },
  };

  if (window.Android && typeof window.Android.mobileBridge === "function") {
    window.Android.mobileBridge(JSON.stringify(param)); // 모바일로 데이터 전송
  }
};

export const sendEventToMobile = (eventType) => {
  const param = {
    EVENT: eventType, // 예: "startStepCounting", "getStepCount", etc.
    DEVICE: "AOS", // AOS 또는 iOS
    DATA: {
      data: "optional data here", // 필요에 따라 데이터 추가
    },
  };

  // 모바일로 호출 (안드로이드 브릿지 예시)
  if (window.Android && typeof window.Android.mobileBridge === "function") {
    window.Android.mobileBridge(JSON.stringify(param)); // 모바일로 데이터 전송
  }

  /*
  인터페이스 이름 예시 : 
    AndroidBridge에서 보내는 메시지는 window.Android.mobileBridge로 전달합니다.
    iOSBridge에서 보내는 메시지는 window.iOS.mobileBridge로 처리될 수 있습니다. 
  */
};

export const sendMessageToAndroid = () => {
  if (window.androidBridge) {
    window.androidBridge.receiveMessageFromWeb("hello from web!");
  } else {
    //iOs
  }
};

export const mobileBridge = (message) => {
  document.getElementById("message").innerText = "from android" + message;
};
