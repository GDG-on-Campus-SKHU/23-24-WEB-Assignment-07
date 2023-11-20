import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// 최소 크기 상수 정의
const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

const VirtualWindow: React.FC = () => {
  // 드래그 및 크기 조절 상태 관리
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // 현재 위치와 크기 상태 관리
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 300, height: 200 });

  // 창, 초기 위치, 초기 크기, 리사이즈 시작 위치의 Ref 설정
  const windowRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef({ x: 0, y: 0 });
  const initialSizeRef = useRef({ width: 0, height: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0 });

  // 마우스 이벤트에 대한 이펙트
  useEffect(() => {
    // 마우스 이동 이벤트 핸들러
    const handleMouseMove = (event: MouseEvent) => {
      // 드래그 중일 때
      if (isDragging) {
        // 새로운 위치 계산
        setPosition({
          x: event.clientX - initialPositionRef.current.x,
          y: event.clientY - initialPositionRef.current.y,
        });
      }
      // 리사이즈 중일 때
      else if (isResizing) {
        // 새로운 크기 계산
        const newWidth = initialSizeRef.current.width + event.clientX - resizeStartRef.current.x;
        const newHeight = initialSizeRef.current.height + event.clientY - resizeStartRef.current.y;

        // 최소 크기 제한
        setSize({
          width: newWidth > MIN_WIDTH ? newWidth : MIN_WIDTH,
          height: newHeight > MIN_HEIGHT ? newHeight : MIN_HEIGHT,
        });
      }
    };

    // 마우스 업 이벤트 핸들러
    const handleMouseUp = () => {
      // 드래그 및 리사이즈 상태 초기화
      setIsDragging(false);
      setIsResizing(false);
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, initialPositionRef, initialSizeRef]);

  // 마우스 다운 이벤트 핸들러
  const handleMouseDown = (event: React.MouseEvent, resize?: boolean) => {
    // 리사이즈 모드일 때
    if (resize) {
      // 리사이즈 상태로 설정
      setIsResizing(true);

      // 리사이즈 시작 위치 및 초기 크기 설정
      resizeStartRef.current = { x: event.clientX, y: event.clientY };
      initialSizeRef.current = { width: size.width, height: size.height };
    }
    // 드래그 모드일 때
    else {
      // 드래그 상태로 설정
      setIsDragging(true);

      // 초기 위치 설정
      initialPositionRef.current = { x: event.clientX - position.x, y: event.clientY - position.y };
    }
  };

  // 렌더링
  return (
    <div
      ref={windowRef}
      className="virtual-window"
      style={{ top: `${position.y}px`, left: `${position.x}px`, width: `${size.width}px`, height: `${size.height}px` }}
    >
      <div className="title-bar" onMouseDown={(e) => handleMouseDown(e)}>
        Drag me
      </div>

      <div className="resize-right" onMouseDown={(e) => handleMouseDown(e, true)}></div>

      <div className="resize-bottom" onMouseDown={(e) => handleMouseDown(e, true)}></div>

      <div className="resize-corner" onMouseDown={(e) => handleMouseDown(e, true)}></div>
    </div>
  );
};

// 최상위 컴포넌트
const App: React.FC = () => {
  return (
    <div className="app">
      <VirtualWindow />
    </div>
  );
};

export default App;
