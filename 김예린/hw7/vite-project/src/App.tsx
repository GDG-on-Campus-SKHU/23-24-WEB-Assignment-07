import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [resizeRight, setResizeRight] = useState(false);
  const [resizeBottom, setResizeBottom] = useState(false);
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [resizeBoth, setResizeBoth] = useState(false);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: event.clientX - initialPosition.x,
          y: event.clientY ,
        });
      }

      else if (resizeRight) {
        setWidth(event.clientX - position.x);
      }

      else if (resizeBottom) {
        setHeight(event.clientY - position.y);
      }
      else if(resizeBoth){
        setWidth(event.clientX - position.x);
        setHeight(event.clientY - position.y);
      }
    };
// 이 설정을 안해서 무한으로 움직이고 길이 늘어나고 그랬음
    const handleMouseUp = () => {
      setResizeRight(false);
      setResizeBottom(false);
      setIsDragging(false);
      setResizeBoth(false)
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);    

    return () => {
       
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);      
       
        };
  }, [isDragging, position, resizeBoth,resizeRight, resizeBottom , initialPosition]);

  const handleMouseDown = (event: React.MouseEvent) => {
    
      const target = event.target as HTMLElement;
      if (target.classList.contains('resizeright')) {
      setResizeRight(true);
      setIsDragging(false);
      setResizeBoth(false)
    } else if (target.classList.contains('resizebottom')) {
      setResizeBottom(true);
      setIsDragging(false);
      setResizeBoth(false)
    }else if(target.classList.contains('both')){
      setResizeBoth(true)
      setIsDragging(false);
    }
    else {
      setIsDragging(true);
      setInitialPosition({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    }
  };

  return (
    <>
      <div
        className="modal"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="title-bar">
          text  <br />
        </div>
        
        <div className="resizeright" style={{width: `${width}px;`}}></div>
        <div className="resizebottom" style={{height: `${height}px;`}}></div>
        <div className="both" style={{width:`${width}px;`, height: `${height}px;`}}></div>
      </div>
    </>
  );
};

export default App;
