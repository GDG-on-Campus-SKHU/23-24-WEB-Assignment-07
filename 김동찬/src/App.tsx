import React, { useEffect, useState, useRef } from "react";

const Test = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const [resizeMode, setResizeMode] = useState(0); // 0 = None 1 = ResizeRight, 2 = ResizeBottom 3 = ResizeDiagonal
  //resizeMode 통합해서 수정

  const titleRef = useRef<HTMLDivElement | null>(null);
  const rightResizeRef = useRef<HTMLDivElement | null>(null);
  const bottomResizeRef = useRef<HTMLDivElement | null>(null);
  const diagonalResizeRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleResizeRightMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    setResizeMode(1);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleResizeBottomMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    setResizeMode(2);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleResizeDiagonalMouseDown: React.MouseEventHandler<
    HTMLDivElement
  > = (e) => {
    setResizeMode(3);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setResizeMode(0);
  };

  const handleMouseMove = (e: MouseEvent) => {
    //MouseEvent 수정
    const deltaX = e.clientX - startDrag.x;
    const deltaY = e.clientY - startDrag.y;
    if (isDragging) {
      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
      setStartDrag({ x: e.clientX, y: e.clientY });
    }

    if (resizeMode > 0) {
      setSize((prevSize) => ({
        width: resizeMode !== 2 ? prevSize.width + deltaX : prevSize.width,
        height: resizeMode !== 1 ? prevSize.height + deltaY : prevSize.height,
      }));

      setStartDrag({ x: e.clientX, y: e.clientY });
    }
  };
  useEffect(() => {
    const titleElement = titleRef.current;
    const rightResizeElement = rightResizeRef.current;
    const bottomResizeElement = bottomResizeRef.current;
    const diagonalResizeElement = diagonalResizeRef.current;

    if (titleElement) {
      titleElement.addEventListener("mouseup", handleMouseUp);
    }

    if (rightResizeElement) {
      rightResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    if (bottomResizeElement) {
      bottomResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    if (diagonalResizeElement) {
      diagonalResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (titleElement) {
        titleElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (rightResizeElement) {
        rightResizeElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (bottomResizeElement) {
        bottomResizeElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (diagonalResizeElement) {
        diagonalResizeElement.removeEventListener("mouseup", handleMouseUp);
      }

      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <div
      className="head"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        background: "white",
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.3)",
        borderRadius: "12px",
        padding: "12px", //padding 추가
      }}
    >
      <div
        ref={titleRef}
        className="title"
        style={{
          cursor: "move",
        }}
        onMouseDown={handleMouseDown} //onMouseDown 수정
      >
        &nbsp;test
        <hr />
      </div>

      <div
        ref={rightResizeRef}
        className="resizeRight"
        style={{
          position: "absolute",
          right: 0,
          width: "20px",
          height: "100%",
          cursor: "e-resize",
        }}
        onMouseDown={handleResizeRightMouseDown}
      />
      <div
        ref={bottomResizeRef}
        className="resizeBottom"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "20px",
          cursor: "s-resize",
        }}
        onMouseDown={handleResizeBottomMouseDown}
      />
      <div
        ref={diagonalResizeRef}
        className="resizeDiagonal"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "20px",
          height: "20px",
          cursor: "se-resize",
        }}
        onMouseDown={handleResizeDiagonalMouseDown}
      />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Test />
    </div>
  );
}

export default App;
