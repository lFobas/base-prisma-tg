"use client";

import React, { useRef } from "react";

function ScrollToTop() {
  const scrollableDivRef = useRef(null);

  const scrollToTopA = () => {
    scrollableDivRef.current.scrollTop = 0;
    console.log(scrollableDivRef);
    
  };

  return (
    <div>
      <button onClick={scrollToTopA}>Наверх</button>
      <div
        ref={scrollableDivRef}
        className="button fixed bottom-4 right-4 z-50 rounded-full shadow-md bg-blue-500 text-white p-3"
      ></div>
    </div>
  );
}

export default ScrollToTop;
