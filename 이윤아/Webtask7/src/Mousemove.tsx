import React, { useEffect } from 'react';

// 마우스 이동을 감지하는 컴포넌트
const MouseMove = ({ handleMouseMove }: { handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 부분
    const handleMouseMoveInternal = (e: React.MouseEvent<HTMLDivElement>) => {
      // 전달받은 콜백 함수를 호출하여 마우스 이동 이벤트 전달
      handleMouseMove(e);
    };

    // 마우스 이동 이벤트를 감지하고 위에서 정의한 핸들러 함수를 호출
    document.addEventListener("mousemove", handleMouseMoveInternal);

    // 컴포넌트가 언마운트되거나 업데이트되기 전에 실행되는 부분
    return () => {
      // 마우스 이동 이벤트 리스너를 제거하여 메모리 누수 방지
      document.removeEventListener("mousemove", handleMouseMoveInternal);
    };
  }, [handleMouseMove]); // handleMouseMove 함수가 업데이트될 때마다 useEffect가 다시 실행

  // JSX에서는 아무것도 렌더링하지 않도록 null을 반환(이벤트 리스너의 해제를 위해 있는 코드)
  return null;
};

export default MouseMove;
