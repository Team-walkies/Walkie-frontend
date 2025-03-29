// export const sendMessageToMobile = (message) => {
//   if (window.AndroidBridge) {
//     // Android 네이티브 메서드 호출
//     window.AndroidBridge.receiveMessageFromWeb(message);
//   } else if (window.iOSBridge) {
//     // iOS 네이티브 메서드 호출
//     window.iOSBridge.receiveMessageFromWeb(message);
//   } else {
//     console.log("No mobile bridge available.");
//   }
// };
// <button onclick="sendMessageToMobile('Hello from Web!')">Send Message to Mobile</button>

export const sendMessageToAndroid = () => {
  if (window.AndroidBridge) {
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
  if (window.AndroidBridge) {
    window.AndroidBridge.haptic();
  } else if (window.webkit.messageHandlers.iOSBridge.postMessage) {
    window.webkit.messageHandlers.iOSBridge.postMessage.haptic();
  }
};

//걸음 수 측정 시작
export const startCountingSteps = () => {
  if (window.AndroidBridge) {
    window.AndroidBridge.startCountingSteps();
  } else if (window.webkit.messageHandlers.iOSBridge.postMessage) {
    window.webkit.messageHandlers.iOSBridge.postMessage.startCountingSteps();
  }
};

//리뷰 작성 완료 + 종료
export const finishReview = () => {
  if (window.AndroidBridge) {
    window.AndroidBridge.finishReview();
  } else if (window.webkit.messageHandlers.iOSBridge.postMessage) {
    window.webkit.messageHandlers.iOSBridge.postMessage.finishReview();
  }
};

//로그아웃
export const mobileLogout = () => {
  if (window.AndroidBridge) {
    window.AndroidBridge.logout();
  } else if (window.webkit.messageHandlers.iOSBridge.postMessage) {
    window.webkit.messageHandlers.iOSBridge.postMessage.logout();
  }
};

//웹뷰 종료
export const finishWebView = () => {
  if (window.AndroidBridge) {
    window.AndroidBridge.finishWebView();
  } else if (window.webkit.messageHandlers.iOSBridge.postMessage) {
    window.webkit.messageHandlers.iOSBridge.postMessage.finishWebView();
  }
};

//모바일 -> 웹
export const getStepsFromMobile = () => {
  // 모바일 앱에서 걸음 수 값을 받아오기
  if (window.AndroidBridge) {
    return window.AndroidBridge.getSteps();
  } else if (window.webkit.messageHandlers.iOSBridge.postMessage) {
    return window.webkit.messageHandlers.iOSBridge.postMessage.getSteps();
  } else {
    console.log("No mobile bridge available.");
    return 0;
  }
};
