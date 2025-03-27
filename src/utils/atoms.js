import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const userDataState = atom({
  key: "userDataState", // 고유한 키
  default: {
    nickName: "",
    exp: 0,
    walkedDay: 0,
    finishedCount: 0,
    pickedCount: 0,
    profile: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const userIdState = atom({
  key: "userIdState",
  default: {
    id: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const geolocationState = atom({
  key: "geolocationState",
  default: {
    longitude: 0,
    latitude: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const locationState = atom({
  key: "locationState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const destiCoordsState = atom({
  key: "destiCoordsState",
  default: {
    longitude: 0,
    latitude: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const destinationState = atom({
  key: "destinationState",
  default: {
    name: "",
    // id: 0, //이후 추가
    startTime: "",
    endTime: "",
    meters: 0,
    type: "",
  },
  effects_UNSTABLE: [persistAtom],
});
