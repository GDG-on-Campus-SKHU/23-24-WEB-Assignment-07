import { useEffect, useState, useRef } from "react";

const Test = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  const [isResizingBottom, setIsResizingBottom] = useState(false);
  const [isResizingDiagonal, setIsResizingDiagonal] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const titleRef = useRef<HTMLDivElement | null>(null);
  const rightResizeRef = useRef<HTMLDivElement | null>(null);
  const bottomResizeRef = useRef<HTMLDivElement | null>(null);
  const diagonalResizeRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleResizeRightMouseDown = (e: MouseEvent) => {
    setIsResizingRight(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleResizeBottomMouseDown = (e: MouseEvent) => {
    setIsResizingBottom(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleResizeDiagonalMouseDown = (e: MouseEvent) => {
    setIsResizingDiagonal(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizingRight(false);
    setIsResizingBottom(false);
    setIsResizingDiagonal(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    if (isResizingRight || isResizingBottom || isResizingDiagonal) {
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;

      setSize((prevSize) => ({
        width: isResizingRight ? prevSize.width + deltaX : prevSize.width,
        height: isResizingBottom ? prevSize.height + deltaY : prevSize.height,
      }));

      setStartDrag({ x: e.clientX, y: e.clientY });
    }

    if (isResizingDiagonal) {
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;

      setSize((prevSize) => ({
        width: prevSize.width + deltaX,
        height: prevSize.height + deltaY,
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
      titleElement.addEventListener("mousedown", handleMouseDown);
      titleElement.addEventListener("mouseup", handleMouseUp);
    }

    if (rightResizeElement) {
      rightResizeElement.addEventListener(
        "mousedown",
        handleResizeRightMouseDown
      );
      rightResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    if (bottomResizeElement) {
      bottomResizeElement.addEventListener(
        "mousedown",
        handleResizeBottomMouseDown
      );
      bottomResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    if (diagonalResizeElement) {
      diagonalResizeElement.addEventListener(
        "mousedown",
        handleResizeDiagonalMouseDown
      );
      diagonalResizeElement.addEventListener("mouseup", handleMouseUp);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (titleElement) {
        titleElement.removeEventListener("mousedown", handleMouseDown);
        titleElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (rightResizeElement) {
        rightResizeElement.removeEventListener(
          "mousedown",
          handleResizeRightMouseDown
        );
        rightResizeElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (bottomResizeElement) {
        bottomResizeElement.removeEventListener(
          "mousedown",
          handleResizeBottomMouseDown
        );
        bottomResizeElement.removeEventListener("mouseup", handleMouseUp);
      }

      if (diagonalResizeElement) {
        diagonalResizeElement.removeEventListener(
          "mousedown",
          handleResizeDiagonalMouseDown
        );
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
      }}
    >
      <div
        ref={titleRef}
        className="title"
        style={{
          cursor: "move",
        }}
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
