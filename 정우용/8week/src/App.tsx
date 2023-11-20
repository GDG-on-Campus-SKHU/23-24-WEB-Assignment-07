import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 300, height: 200 });
    const windowRef = useRef<HTMLDivElement>(null);

    const onMouseDownDrag = (e: React.MouseEvent) => {
        setIsDragging(true);
        if (windowRef.current) {
            setPosition({
                x: e.clientX - windowRef.current.offsetLeft,
                y: e.clientY - windowRef.current.offsetTop,
            });
        }
    };

    const onMouseDownResize = (e: React.MouseEvent) => {
        setIsResizing(true);
    };

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

    const onMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

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

    return (
        <div ref={windowRef} className="window" style={{ width: `${size.width}px`, height: `${size.height}px` }}>
            <div className="title-bar" onMouseDown={onMouseDownDrag}>
                Drag Me
            </div>
            <div className="content">test</div>
            <div className="resize-handle" onMouseDown={onMouseDownResize}></div>
        </div>
    );
};

export default App;
