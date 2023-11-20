import React, { useRef, useState, useEffect } from "react";

const DraggableBox: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<
    "right" | "bottom" | "corner" | "move" | "none"
  >("none");
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && boxRef.current) {
        const newX = e.clientX - initialPosition.x;
        const newY = e.clientY - initialPosition.y;

        if (resizeDirection === "move") {
          boxRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        } else {
          const newWidth =
            resizeDirection === "right" || resizeDirection === "corner"
              ? initialWidth + (e.clientX - initialPosition.x)
              : initialWidth;
          const newHeight =
            resizeDirection === "bottom" || resizeDirection === "corner"
              ? initialHeight + (e.clientY - initialPosition.y)
              : initialHeight;

          boxRef.current.style.width = `${Math.max(newWidth, 100)}px`;
          boxRef.current.style.height = `${Math.max(newHeight, 100)}px`;
        }
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setResizeDirection("none");
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    initialPosition,
    resizeDirection,
    initialWidth,
    initialHeight,
  ]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();

      if (e.clientY < rect.top + 30) {
        setDragging(true);
        setResizeDirection("move");
      } else if (e.clientX > rect.right - 10 && e.clientY > rect.bottom - 10) {
        setDragging(true);
        setResizeDirection("corner");
        setInitialWidth(rect.width);
        setInitialHeight(rect.height);
      } else if (e.clientX > rect.right - 10) {
        setDragging(true);
        setResizeDirection("right");
        setInitialWidth(rect.width);
      } else if (e.clientY > rect.bottom - 10) {
        setDragging(true);
        setResizeDirection("bottom");
        setInitialHeight(rect.height);
      }

      setInitialPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
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
