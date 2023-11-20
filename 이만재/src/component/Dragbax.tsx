import React, { useRef, useState, useEffect } from "react";

const DraggableBox: React.FC = () => {
  // 박스 엘리먼트에 대한 Ref
  const boxRef = useRef<HTMLDivElement>(null);

  // 드래깅 및 리사이징 상태를 추적하는 상태 변수
  const [isDragging, setDragging] = useState(false);
  const [isResizingRight, setResizingRight] = useState(false);
  const [isResizingBottom, setResizingBottom] = useState(false);
  const [isResizingCorner, setResizingCorner] = useState(false);

  // 리사이징을 위한 초기 너비와 높이를 저장하는 상태 변수
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);

  // 초기 마우스 다운 시의 상대적인 위치를 저장하는 상태 변수
  const [initialOffsetX, setInitialOffsetX] = useState(0);
  const [initialOffsetY, setInitialOffsetY] = useState(0);

  // 마우스 이동 및 마우스 업 이벤트를 처리하는 효과
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && boxRef.current) {
        const newX = e.clientX - initialOffsetX;
        const newY = e.clientY - initialOffsetY;

        // 드래깅 중일 때, 박스를 새로운 위치로 이동
        boxRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }

      if ((isResizingRight || isResizingCorner) && boxRef.current) {
        const newWidth = initialWidth + (e.clientX - initialWidth);

        // 우측 또는 우측 하단 대각선 리사이징 중일 때, 너비를 조절함
        boxRef.current.style.width = `${Math.max(newWidth, 100)}px`;
      }

      if ((isResizingBottom || isResizingCorner) && boxRef.current) {
        const newHeight = initialHeight + (e.clientY - initialHeight);

        // 하단 또는 우측 하단 대각선 리사이징 중일 때, 높이를 조절함
        boxRef.current.style.height = `${Math.max(newHeight, 100)}px`;
      }
    };

    const handleMouseUp = () => {
      // 드래깅 및 리사이징 상태를 초기화하고 이벤트 리스너를 제거함
      setDragging(false);
      setResizingRight(false);
      setResizingBottom(false);
      setResizingCorner(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // 드래깅 또는 리사이징 중일 때, 이벤트 리스너를 추가함
    if (isDragging || isResizingRight || isResizingBottom || isResizingCorner) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    // 컴포넌트가 언마운트되면 이벤트 리스너를 정리
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizingRight,
    isResizingBottom,
    isResizingCorner,
    initialWidth,
    initialHeight,
    initialOffsetX,
    initialOffsetY,
  ]);

  // 마우스 다운 이벤트를 처리하는 함수
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();

      // 상단 30px 이내를 클릭하면 드래그를 시작
      if (e.clientY < rect.top + 30) {
        setDragging(true);

        // 초기 마우스 다운 시의 상대적인 위치를 계산
        setInitialOffsetX(e.clientX - rect.left);
        setInitialOffsetY(e.clientY - rect.top);
      }
      // 우측 하단 10px 이내를 클릭하면 우측 하단 대각선 리사이징을 시작
      else if (e.clientX > rect.right - 10 && e.clientY > rect.bottom - 10) {
        setResizingCorner(true);
      }
      // 우측 10px 이내를 클릭하면 우측 리사이징을 시작
      else if (e.clientX > rect.right - 10) {
        setResizingRight(true);
        setInitialWidth(rect.width);
      }
      // 하단 10px 이내를 클릭하면 하단 리사이징을 시작
      else if (e.clientY > rect.bottom - 10) {
        setResizingBottom(true);
        setInitialHeight(rect.height);
      }
      // 그 외의 경우 드래그 및 리사이징을 종료
      else {
        setDragging(false);
        setResizingRight(false);
        setResizingBottom(false);
        setResizingCorner(false);
      }
    }
  };

  return (
    <div
      ref={boxRef}
      className={`draggable-box ${isDragging ? "dragging" : ""}`}
      onMouseDown={handleMouseDown}
    >
      <p>test</p>
    </div>
  );
};

export default DraggableBox;
