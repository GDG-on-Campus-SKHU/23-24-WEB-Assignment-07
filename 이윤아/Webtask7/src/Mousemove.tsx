import React, { useEffect } from 'react';

//  document 전역에서 마우스 이동 이벤트를 감지하고 해당 이벤트가 발생하면 prop으로 전달받은 핸들러를 실행
const MouseMove = ({ handleMouseMove }: { handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
  // useEffect를 사용하여 컴포넌트가 마운트될 때 document에 이벤트 리스너를 등록하고, 언마운트될 때 이벤트 리스너를 해제
  useEffect(() => {
    // 마우스 이동 이벤트가 발생하면 handleMouseMove을 호출
    const handleMouseMoveInternal = (e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseMove(e);
    };

    // document 전역에 마우스 이동 이벤트 리스너 등록
    document.addEventListener("mousemove", handleMouseMoveInternal);

    // 컴포넌트 언마운트 시에 이벤트 리스너 해제
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveInternal);
    };
  }, [handleMouseMove]); // handleMouseMove이 변경될 때마다 useEffect가 다시 실행

  // MouseMove 컴포넌트는 실제로 렌더링되는 부분이 없으므로 null을 반환
  return null;
};

export default MouseMove;
