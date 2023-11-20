import { useRef, useEffect } from "react";
import "./App.css";

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const topBoxRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const isMoving = useRef<boolean>(false);
  const initialX = useRef<number>(0);
  const initialY = useRef<number>(0);
  const initialWidth = useRef<number>(0);
  const initialHeight = useRef<number>(0);

  useEffect(() => {
    const main = mainRef.current;
    const topBox = topBoxRef.current;
    const bottomRight = bottomRightRef.current;

    if (!main || !topBox || !bottomRight) return;

    const handleTopBoxMouseDown = (e: MouseEvent) => {
      isMoving.current = true;
      const rect = main.getBoundingClientRect();
      initialX.current = e.clientX - rect.left;
      initialY.current = e.clientY - rect.top;
    };

    const handleTopBoxMouseMove = (e: MouseEvent) => {
      if (!isMoving.current) return;

      const newX = e.clientX - initialX.current;
      const newY = e.clientY - initialY.current;

      main.style.left = `${newX}px`;
      main.style.top = `${newY}px`;
    };

    const handleTopBoxMouseUp = () => {
      isMoving.current = false;
    };

    const handleBottomRightMouseDown = (e: MouseEvent) => {
      initialWidth.current = main.offsetWidth;
      initialHeight.current = main.offsetHeight;
      isMoving.current = true;
    };

    const handleBottomRightMouseMove = (e: MouseEvent) => {
      if (!isMoving.current) return;

      const newWidth =
        initialWidth.current +
        (e.clientX - bottomRight.getBoundingClientRect().left);
      const newHeight =
        initialHeight.current +
        (e.clientY - bottomRight.getBoundingClientRect().top);

      main.style.width = `${newWidth}px`;
      main.style.height = `${newHeight}px`;
    };

    const handleBottomRightMouseUp = () => {
      isMoving.current = false;
    };

    topBox.addEventListener("mousedown", handleTopBoxMouseDown);
    topBox.addEventListener("mousemove", handleTopBoxMouseMove);
    topBox.addEventListener("mouseup", handleTopBoxMouseUp);

    bottomRight.addEventListener("mousedown", handleBottomRightMouseDown);
    window.addEventListener("mousemove", handleBottomRightMouseMove);
    window.addEventListener("mouseup", handleBottomRightMouseUp);

    return () => {
      topBox.removeEventListener("mousedown", handleTopBoxMouseDown);
      topBox.removeEventListener("mousemove", handleTopBoxMouseMove);
      topBox.removeEventListener("mouseup", handleTopBoxMouseUp);

      bottomRight.removeEventListener("mousedown", handleBottomRightMouseDown);
      window.removeEventListener("mousemove", handleBottomRightMouseMove);
      window.removeEventListener("mouseup", handleBottomRightMouseUp);
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className="main"
      style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        cursor: "move",
        borderRadius: "20px",
        border: "1px solid lightgray",
        boxShadow:
          "5px 5px 5px rgba(0, 0, 0, 0.1), -5px -5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        ref={topBoxRef}
        className="topBox"
        style={{
          position: "absolute",
          width: "100%",
          height: "100px",
          borderBottom: "1px solid black",
          cursor: "move",
          fontSize: "55px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        test
      </div>
      <div
        ref={bottomRightRef}
        className="bottom-right"
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          bottom: "0",
          right: "0",
          cursor: "se-resize",
        }}
      />
      <div className="bottomBox"></div>
    </div>
  );
}

export default App;
