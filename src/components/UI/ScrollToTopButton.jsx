"use client";
import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="button fixed bottom-4 right-4 z-50 rounded-full shadow-md bg-blue-500 text-white p-3"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
