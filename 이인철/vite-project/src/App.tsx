import React, { useEffect, useRef, MouseEvent } from "react";
import './App.css';

function App() {
  const virtualWref = useRef<HTMLDivElement | null>(null);
  const h1ref = useRef<HTMLDivElement | null>(null);
  const resize1 = useRef<HTMLDivElement | null>(null);
  const downsize = useRef<HTMLDivElement | null>(null);
  const allsize = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const isResizing = useRef(false);
  const isDragging = useRef(false);
  const isDownsizing = useRef(false);
  const isAllsizing = useRef(false);

  useEffect(() => {

    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });
  const handleMouseDown = (event: globalThis.MouseEvent) => {
    if (virtualWref.current instanceof HTMLElement) {
      if (event.target === h1ref.current) {
        isDragging.current = true;
        offset.current = {
          x: event.clientX - virtualWref.current.getBoundingClientRect().left,
          y: event.clientY - virtualWref.current.getBoundingClientRect().top,
        };
      } else if (event.target === resize1.current) {
        isResizing.current = true;
        let target = event.target as HTMLDivElement
        let a =target.getBoundingClientRect() //getBoundingClientRect() 크기나 위치 정보 반환
        offset.current = {
          x: event.clientX-a.x,   //마우스가 발생한 이벤트 좌표에서 div x,y좌표를 뺌
          y: event.clientY-a.y,
        }
      }
      else if(event.target === downsize.current){
        isDownsizing.current = true;
        let target = event.target as HTMLDivElement
        let c =target.getBoundingClientRect() //여기서 target은 downsize div를 가리킴
        offset.current = {
          x: event.clientX-c.x,   //마우스가 발생한 이벤트 좌표에서 div x,y좌표를 뺌
          y: event.clientY-c.y, 
        };  
       
      }
      else if(event.target === allsize.current){
        isAllsizing.current = true;
        let target = event.target as HTMLDivElement
        let d =target.getBoundingClientRect()
        offset.current = {
          x: event.clientX-d.x,   //마우스가 발생한 이벤트 좌표에서 div x,y좌표를 뺌
          y: event.clientY-d.y, 
        }; 
      

      }
    }
  };

  const handleMouseMove = (event: globalThis.MouseEvent) => {
    if (isDragging.current&& virtualWref.current instanceof HTMLElement) {
      const x = event.clientX - offset.current.x;
      const y = event.clientY - offset.current.y;
      virtualWref.current.style.left = `${x}px`;
      virtualWref.current.style.top = `${y}px`;
    }

    if (isResizing.current && virtualWref.current) {
      const deltaX = event.clientX-offset.current.x;
      virtualWref.current.style.width = `${deltaX}px`;
    }
    if (isDownsizing.current && virtualWref.current) {
      
      const deltaX2 = event.clientY-offset.current.y ;
      virtualWref.current.style.height = `${deltaX2}px`;
    }
    if(isAllsizing.current && virtualWref.current){
      const deltaX3 = event.clientY-offset.current.x;
      const deltaX4 = event.clientX-offset.current.y;
      virtualWref.current.style.height = `${deltaX3}px`;
      virtualWref.current.style.width = `${deltaX4}px`;

    }
  };

  

  const handleMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
    isDownsizing.current = false;
    isAllsizing.current = false;
  };


  return (
    <>
      <div ref={virtualWref} className="VirtualW">
        <div ref={h1ref}>test</div>
        <hr />
        <div ref={resize1} className="resize" />
        <div ref={downsize} className="downsize">
          <div ref={allsize} className="allresize"/>
        </div>
      </div>
    </>
  );
}

export default App;
