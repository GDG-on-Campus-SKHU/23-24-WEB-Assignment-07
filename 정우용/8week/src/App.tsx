import React, { useState, useRef, useEffect } from 'react';
import './App.less';

const App = () => {
    // 드래그 상태 관리
    const [isDragging, setIsDragging] = useState(false);

    // 리사이징 상태 관리
    const [isResizing, setIsResizing] = useState(false);

    // 윈도우의 현재 위치 관리 (x,y 좌표)
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // 윈도우의 크기 관리, 너비와 높이를 가짐
    const [size, setSize] = useState({ width: 300, height: 200 });

    // 윈도우 DOM 요소에 대한 참조, DOM에 직접 접근 시 사용
    const windowRef = useRef<HTMLDivElement>(null);

    // 드래그 시작 시 호출
    // 마우스 클릭 위치와 윈도우의 현재 위치를 계산하여 position 상태 업데이트
    const onMouseDownDrag = (e: React.MouseEvent) => {
        setIsDragging(true);
        if (windowRef.current) {
            setPosition({
                x: e.clientX - windowRef.current.offsetLeft,
                y: e.clientY - windowRef.current.offsetTop,
            });
        }
    };

    // 리사이징 시작 시 상태를 true로
    const onMouseDownResize = (e: React.MouseEvent) => {
        setIsResizing(true);
    };

    // 마우스 움직임(드래그 중, 리사이징 중) 일때 윈도우의 위치나 크기 업데이트
    const onMouseMove = (e: MouseEvent) => {
        if (isDragging && windowRef.current) {
            windowRef.current.style.left = `${e.clientX - position.x}px`;
            windowRef.current.style.top = `${e.clientY - position.y}px`;
        }
        if (isResizing && windowRef.current) {
            const rect = windowRef.current.getBoundingClientRect();
            setSize({
                width: Math.max(100, e.clientX - rect.left),
                height: Math.max(100, e.clientY - rect.top),
            });
        }
    };

    // 마우스 버튼을 놓았을 때 드래그나 리사이징 상태를 false로
    const onMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    // 컴포넌트 마운트 및 업데이트 시 window 객체에
    // mousemove, mouseup 이벤트 리스너 추가,
    // 언마운트 시 리스너 제거
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => onMouseMove(e);
        const handleMouseUp = () => onMouseUp();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, position]);

    // 윈도우, 제목 표시줄, 내용, 리사이즈 핸들 렌더링
    return (
        <div ref={windowRef} className="window" style={{ width: `${size.width}px`, height: `${size.height}px` }}>
            <div className="title-bar" onMouseDown={onMouseDownDrag}>
                test
            </div>
            <div className="content">drag</div>
            <div className="resize-handle" onMouseDown={onMouseDownResize}></div>
        </div>
    );
};

export default App;
