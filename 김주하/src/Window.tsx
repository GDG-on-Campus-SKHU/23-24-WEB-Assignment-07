import React, { useState, useEffect, useRef } from "react";
import "./App.less";

const Window = () => {
  const [state, setState] = useState({
    position: { x: 0, y: 0 },
    size: { width: 100, height: 100 },
    isDragging: false,
    isResizing: false,
    startDrag: { x: 0, y: 0 },
  });

  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target === windowRef.current) {
      setState((prev) => ({
        ...prev,
        isDragging: true,
        startDrag: {
          x: e.clientX - prev.position.x,
          y: e.clientY - prev.position.y,
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isResizing: true,
        startDrag: {
          x: e.clientX - prev.size.width,
          y: e.clientY - prev.size.height,
        },
      }));
    }
  };

  const handleMouseUp = () => {
    setState((prev) => ({
      ...prev,
      isDragging: false,
      isResizing: false,
    }));
  };

  const onMouseMove = (e) => {
    const { isDragging, isResizing, startDrag } = state;

    if (isDragging && windowRef.current) {
      setState((prev) => ({
        ...prev,
        position: {
          x: e.clientX - startDrag.x,
          y: e.clientY - startDrag.y,
        },
      }));
    }

    if (isResizing && windowRef.current) {
      setState((prev) => ({
        ...prev,
        size: {
          width: Math.max(100, e.clientX - startDrag.x),
          height: Math.max(100, e.clientY - startDrag.y),
        },
      }));
    }
  };

  useEffect(() => {
    if (state.isDragging || state.isResizing) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [state.isDragging, state.isResizing]);

  return (
    <div
      ref={windowRef}
      className="head"
      style={{
        position: "absolute",
        top: state.position.y,
        left: state.position.x,
        width: state.size.width,
        height: state.size.height,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="title">&nbsp;Test</div>
      <hr></hr>
      <div className="resizeRight" />
      <div className="resizeBottom" />
      <div className="resizeDiagonal" />
    </div>
  );
};

export default Window;
