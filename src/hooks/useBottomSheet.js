import React, { useEffect, useRef, useState } from "react";

import { MIN_Y, MAX_Y, BOTTOM_SHEET_HEIGHT } from "../utils/btmSheetConfig";

const useBottomSheet = () => {
  const sheet = useRef(null);
  const metrics = useRef({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
  });

  useEffect(() => {
    //터치 시작
    const handleTouchStart = (e) => {
      const { touchStart, touchMove } = metrics.current;

      touchStart.sheetY = sheet.current.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    //터치 후 이동
    const handleTouchMove = (e) => {
      e.preventDefault();

      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = "down";
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = "up";
      }

      // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
      const touchOffset = currentTouch.clientY - touchStart.touchY;
      let nextSheetY = touchStart.sheetY + touchOffset;

      // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
      if (nextSheetY <= MIN_Y) {
        nextSheetY = MIN_Y;
      }

      if (nextSheet >= MAX_Y) {
        nextSheetY = MAX_Y;
      }

      // sheet 위치 갱신.
      sheet.current.style.setProperty(
        "transform",
        `translateY(${nextSheetY - MAX_Y}px)`
      );
    };

    //터치 종료
    const handleTouchEnd = (e) => {};
    sheet.current.addEventListener("touchstart", handleTouchStart);
    sheet.current.addEventListener("touchmove", handleTouchMove);
    sheet.current.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheet.current.removeEventListener("touchstart", handleTouchStart);
      sheet.current.removeEventListener("touchmove", handleTouchMove);
      sheet.current.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return { sheet };
};

export default useBottomSheet;
