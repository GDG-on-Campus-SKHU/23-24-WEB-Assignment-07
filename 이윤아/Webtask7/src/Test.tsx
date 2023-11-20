import React, { useEffect, useState, useRef } from 'react';
import './App.less';

const Test = () => {
  // 상태 관리
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 창의 위치
  const [size, setSize] = useState({ width: 100, height: 100 }); // 창의 크기
  const [isDragging, setIsDragging] = useState(false); // 드래그 중 여부
  const [isResizingRight, setIsResizingRight] = useState(false); // 오른쪽 리사이즈 중 여부
  const [isResizingBottom, setIsResizingBottom] = useState(false); // 아래쪽 리사이즈 중 여부
  const [isResizingDiagonal, setIsResizingDiagonal] = useState(false); // 대각선 리사이즈 중 여부
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 }); // 드래그 또는 리사이즈 시작 시점의 좌표

  // Refs 설정
  const titleRef = useRef<HTMLDivElement | null>(null); // 타이틀 요소의 Ref
  const rightResizeRef = useRef<HTMLDivElement | null>(null); // 우측 리사이즈 요소의 Ref
  const bottomResizeRef = useRef<HTMLDivElement | null>(null); // 하단 리사이즈 요소의 Ref
  const diagonalResizeRef = useRef<HTMLDivElement | null>(null); // 대각선 리사이즈 요소의 Ref

  // 마우스 다운 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // 우측 리사이즈 마우스 다운 이벤트 핸들러
  const handleResizeRightMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsResizingRight(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // 하단 리사이즈 마우스 다운 이벤트 핸들러
  const handleResizeBottomMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsResizingBottom(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // 대각선 리사이즈 마우스 다운 이벤트 핸들러
  const handleResizeDiagonalMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsResizingDiagonal(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // 마우스 업 이벤트 핸들러
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizingRight(false);
    setIsResizingBottom(false);
    setIsResizingDiagonal(false);
  };

  // 마우스 이동 이벤트 핸들러
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      // 드래그 중이면 창의 위치 업데이트
      setPosition({ x: e.clientX, y: e.clientY });
    }

    if (isResizingRight || isResizingBottom || isResizingDiagonal) {
      // 리사이즈 중이면 창의 크기 업데이트
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;

      setSize((prevSize) => ({
        width: isResizingRight ? prevSize.width + deltaX : prevSize.width,
        height: isResizingBottom ? prevSize.height + deltaY : prevSize.height,
      }));

      setStartDrag({ x: e.clientX, y: e.clientY });
    }

    if (isResizingDiagonal) {
      // 대각선 리사이즈 중이면 창의 크기 업데이트
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;

      setSize((prevSize) => ({
        width: prevSize.width + deltaX,
        height: prevSize.height + deltaY,
      }));

      setStartDrag({ x: e.clientX, y: e.clientY });
    }
  };

  // useEffect를 활용하여 이벤트 리스너 등록 및 해제
  useEffect(() => {
    const titleElement = titleRef.current;
    const rightResizeElement = rightResizeRef.current;
    const bottomResizeElement = bottomResizeRef.current;
    const diagonalResizeElement = diagonalResizeRef.current;

    if (titleElement) {
      titleElement.addEventListener("mousedown", handleMouseDown);
      titleElement.addEventListener("mouseup", handleMouseUp);
    }

    if (rightResizeElement) {
      rightResizeElement.addEventListener("mousedown", handleResizeRightMouseDown);
      rightResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    if (bottomResizeElement) {
      bottomResizeElement.addEventListener("mousedown", handleResizeBottomMouseDown);
      bottomResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    if (diagonalResizeElement) {
      diagonalResizeElement.addEventListener("mousedown", handleResizeDiagonalMouseDown);
      diagonalResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (titleElement) {
        titleElement.removeEventListener("mousedown", handleMouseDown);
        titleElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (rightResizeElement) {
        rightResizeElement.removeEventListener("mousedown", handleResizeRightMouseDown);
        rightResizeElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (bottomResizeElement) {
        bottomResizeElement.removeEventListener("mousedown", handleResizeBottomMouseDown);
        bottomResizeElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (diagonalResizeElement) {
        diagonalResizeElement.removeEventListener("mousedown", handleResizeDiagonalMouseDown);
        diagonalResizeElement.removeEventListener("mouseup", handleMouseUp);
      }

      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, isResizingRight, isResizingBottom, isResizingDiagonal, position, startDrag]);

  // 컴포넌트 렌더링
  return (
    <div
      className="head"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
      }}
    >
      <div
        ref={titleRef}
        className="title"
      >
        &nbsp;test
        <hr />
      </div>

      <div
        ref={rightResizeRef}
        className="resizeRight"
      />
      <div
        ref={bottomResizeRef}
        className="resizeBottom"
      />
      <div
        ref={diagonalResizeRef}
        className="resizeDiagonal"
      />
    </div>
  );
};

export default Test;
