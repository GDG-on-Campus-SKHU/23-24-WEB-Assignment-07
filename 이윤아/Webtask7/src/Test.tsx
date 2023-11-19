import React, { useState } from 'react';
import MouseDown from './Mousedown';
import MouseUp from './Mouseup';
import MouseMove from './Mousemove';
import './App.less';

// Test 컴포넌트 정의
const Test = () => {
  // 상태 변수 정의
  const [position, setPosition] = useState({ x: 0, y: 0 }); // position: 현재 요소의 좌표를 나타내는 상태 변수
  const [size, setSize] = useState({ width: 100, height: 100 }); // size: 현재 요소의 크기를 나타내는 상태 변수
  const [isDragging, setIsDragging] = useState(false); // isDragging: 요소를 드래그 중인지 여부를 나타내는 상태 변수
  const [isResizingRight, setIsResizingRight] = useState(false); // isResizingRight: 요소를 오른쪽으로 리사이징 중인지 여부를 나타내는 상태 변수
  const [isResizingBottom, setIsResizingBottom] = useState(false); // isResizingBottom: 요소를 아래쪽으로 리사이징 중인지 여부를 나타내는 상태 변수
  const [isResizingDiagonal, setIsResizingDiagonal] = useState(false); // isResizingDiagonal: 요소를 대각선 방향으로 리사이징 중인지 여부를 나타내는 상태 변수
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 }); // startDrag: 드래그 또는 리사이징 시작 시의 마우스 좌표를 저장하는 상태 변수

  // 마우스 다운 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // 요소를 드래그 시작하면 해당 상태를 true로 설정하고, 드래그 시작 지점의 마우스 좌표를 저장
    setIsDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // 오른쪽 리사이즈 마우스 다운 이벤트 핸들러
  const handleResizeRightMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // 오른쪽으로 리사이징 시작하면 해당 상태를 true로 설정하고, 리사이징 시작 지점의 마우스 좌표를 저장
    setIsResizingRight(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // 아래쪽 리사이즈 마우스 다운 이벤트 핸들러
  const handleResizeBottomMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // 아래쪽으로 리사이징 시작하면 해당 상태를 true로 설정하고, 리사이징 시작 지점의 마우스 좌표를 저장
    setIsResizingBottom(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // 대각선 리사이즈 마우스 다운 이벤트 핸들러
  const handleResizeDiagonalMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // 대각선으로 리사이징 시작하면 해당 상태를 true로 설정하고, 리사이징 시작 지점의 마우스 좌표를 저장
    setIsResizingDiagonal(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  // 마우스 업 이벤트 핸들러
  const handleMouseUp = () => {
    // 마우스 업이 되면 모든 드래그 및 리사이징 상태를 false로 설정
    setIsDragging(false);
    setIsResizingRight(false);
    setIsResizingBottom(false);
    setIsResizingDiagonal(false);
  };

  // 마우스 무브 이벤트 핸들러
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 만약 드래그 중이라면 현재 마우스 좌표로 요소의 위치를 설정
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    // 만약 오른쪽 또는 아래쪽으로 리사이징 중이라면 마우스 이동에 따라 요소의 크기를 조절
    if (isResizingRight || isResizingBottom || isResizingDiagonal) {
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;

      setSize((prevSize) => ({
        width: isResizingRight ? prevSize.width + deltaX : prevSize.width,
        height: isResizingBottom ? prevSize.height + deltaY : prevSize.height,
      }));

      // 다음 리사이징을 위해 리사이징 시작 지점의 마우스 좌표를 업데이트
      setStartDrag({ x: e.clientX, y: e.clientY });
    }

    // 대각선으로 리사이징 중이라면 마우스 이동에 따라 요소의 크기를 조절
    if (isResizingDiagonal) {
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;

      setSize((prevSize) => ({
        width: prevSize.width + deltaX,
        height: prevSize.height + deltaY,
      }));

      // 다음 리사이징을 위해 리사이징 시작 지점의 마우스 좌표를 업데이트
      setStartDrag({ x: e.clientX, y: e.clientY });
    }
  };

  // JSX를 통한 컴포넌트 렌더링
  return (
    <div className="app">
      <div
        className="head"
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          width: size.width,
          height: size.height,
          background: "white",
          boxShadow: "0px 0px 12px lightgrey",
        }}
      >
        {/* MouseDown, MouseUp, MouseMove 컴포넌트를 통해 이벤트 핸들링 */}
        <MouseDown handleMouseDown={handleMouseDown} />
        <MouseUp handleMouseUp={handleMouseUp} />
        <MouseMove handleMouseMove={handleMouseMove} />

        {/* 헤드 내부의 구성요소 */}
        <div className="title">
          &nbsp;test
          <hr />
        </div>

        {/* 오른쪽, 아래쪽, 대각선 리사이징을 위한 div 요소 */}
        <div
          className="resizeRight"
          onMouseDown={handleResizeRightMouseDown}
        />
        <div
          className="resizeBottom"
          onMouseDown={handleResizeBottomMouseDown}
        />
        <div
          className="resizeDiagonal"
          onMouseDown={handleResizeDiagonalMouseDown}
        />
      </div>
    </div>
  );
};

// Test 컴포넌트를 외부로 내보냄
export default Test;
