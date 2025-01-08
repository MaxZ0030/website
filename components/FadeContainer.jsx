"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";


export default function FadeContainer({ children }) {
  const pathname = usePathname();


  const [oldChildren, setOldChildren] = useState(children);
  const [currentChildren, setCurrentChildren] = useState(children);


  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {

    setIsFadingOut(true);


    const timeout = setTimeout(() => {

      setCurrentChildren(children);
      setIsFadingOut(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [children]);

  
  useEffect(() => {
    if (!isFadingOut) {
      setOldChildren(currentChildren);
    }
  }, [isFadingOut, currentChildren]);

  return (
    <div className="fade-container">
      
      {isFadingOut ? (
        <div className="page-content fade-out">
          {oldChildren}
        </div>
      ) : (
        <div className="page-content fade-in">
          {currentChildren}
        </div>
      )}
    </div>
  );
}
