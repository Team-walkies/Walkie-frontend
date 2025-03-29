// export const sendMessageToMobile = (message) => {
//   if (window.androidBridge) {
//     // Android 네이티브 메서드 호출
//     window.androidBridge.receiveMessageFromWeb(message);
//   } else if (window.iOSBridge) {
//     // iOS 네이티브 메서드 호출
//     window.iOSBridge.receiveMessageFromWeb(message);
//   } else {
//     console.log("No mobile bridge available.");
//   }
// };
// <button onclick="sendMessageToMobile('Hello from Web!')">Send Message to Mobile</button>

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

//햅틱 동작
export const sendHaptic = () => {
  if (window.androidBridge) {
    window.androidBridge.haptic();
  } else if (window.iOSBridge) {
    window.iOSBridge.haptic();
  }
};

//걸음 수 측정 시작
export const startCountingSteps = () => {
  if (window.androidBridge) {
    window.androidBridge.startCountingSteps();
  } else if (window.iOSBridge) {
    window.iOSBridge.startCountingSteps();
  }
};

//리뷰 작성 완료 + 종료
export const finishReview = () => {
  if (window.androidBridge) {
    window.androidBridge.finishReview();
  } else if (window.iOSBridge) {
    window.iOSBridge.finishReview();
  }
};

//로그아웃
export const mobileLogout = () => {
  if (window.androidBridge) {
    window.androidBridge.logout();
  } else if (window.iOSBridge) {
    window.iOSBridge.logout();
  }
};

//웹뷰 종료
export const finishWebView = () => {
  if (window.androidBridge) {
    window.androidBridge.finishWebView();
  } else if (window.iOSBridge) {
    window.iOSBridge.finishWebView();
  }
};

//모바일 -> 웹
export const getStepsFromMobile = () => {
  // 모바일 앱에서 걸음 수 값을 받아오기
  if (window.androidBridge) {
    return window.androidBridge.getSteps();
  } else if (window.iOSBridge) {
    return window.iOSBridge.getSteps();
  } else {
    console.log("No mobile bridge available.");
    return 0;
  }
};
