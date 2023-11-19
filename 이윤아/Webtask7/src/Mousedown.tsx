import React, { useEffect } from 'react';

// MouseDown 컴포넌트
const MouseDown = ({ handleMouseDown }: { handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void }) => {

  // useEffect 훅을 사용하여 컴포넌트가 마운트되거나 handleMouseDown이 변경될 때 이벤트 리스너를 추가하고 제거한다.
  useEffect(() => {
    // 내부에서 사용되는 이벤트 핸들러 함수 정의
    const handleMouseDownInternal = (e: React.MouseEvent<HTMLDivElement>) => {
      // 외부에서 전달받은 handleMouseDown 함수 호출
      handleMouseDown(e);
    };

    // 문서 전체에 대한 마우스 다운 이벤트에 대한 이벤트 리스너 등록
    document.addEventListener("mousedown", handleMouseDownInternal);

    // 컴포넌트 언마운트 시 등록한 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleMouseDownInternal);
    };
  }, [handleMouseDown]); // handleMouseDown이 변경될 때마다 useEffect가 다시 실행되도록 함

  // JSX에서는 아무것도 렌더링하지 않도록 null을 반환(이벤트 리스너의 해제를 위해 있는 코드)
  return null;
};

// MouseDown 컴포넌트를 외부에서 사용할 수 있도록 내보냄
export default MouseDown;
