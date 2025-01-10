"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "../app/globals.css";


export default function ContentContainer({ children }) {
  const pathname = usePathname();

  
  const [visible, setVisible] = useState(false);
  
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    if (pathname === "/") {
      setZIndex(-100);    
      setVisible(false);
    } else {
      setZIndex(1);       
      setVisible(true);
    }
  }, [pathname]);

  return (
    <div 
      className={`
        content-container
        ${visible ? "fade-in" : "fade-out"}
      `}
      style={{
        zIndex: zIndex, 
      }}
    >
      <div className="projects-scroll-pane">
        {children}
      </div>
    </div>
  );
}
