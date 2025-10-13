"use client";
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const images = [
  "/assets/self-japan.jpg",
  "/assets/self-city.jpg",
  "/assets/self-woods.jpg",
  "/assets/self-hamilton.jpg",
  "/assets/self-jump.jpg",
];

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [displayImageIndex, setDisplayImageIndex] = useState(0);

  const handleImageLoad = useCallback(() => {
    if (displayImageIndex === currentImageIndex) {
      setIsFading(false);
    }
  }, [currentImageIndex, displayImageIndex]);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      const fadeDuration = 500;
      
      setTimeout(() => {
        const nextIndex = (currentImageIndex + 1) % images.length; 
        
        setCurrentImageIndex(nextIndex); 
        setDisplayImageIndex(nextIndex);
      }, fadeDuration);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="content-card fade-in">
      <main style={{ position: 'relative', zIndex: 1, padding: '1rem' }}>
        <h1>About Me</h1>
        <br />
        <div className="image-carousel-wrapper">
          <img
            src={images[displayImageIndex]} 
            alt="A picture of me"
            onLoad={handleImageLoad}
            className={`image-carousel-item ${isFading ? 'fading-out' : 'fading-in'}`}
          />
        </div>
        <br />
        <br />
        <br />
        <p>
          Hello! My name is Max Zhou. Currently, I'm a student at Carnegie Mellon University, working on getting my Master of Entertainment Technology.
          I'm also a former Software Development Engineer from Amazon Lab126 who worked on the newly released VegaOS project.
          For my undergrad, I went to the University of Texas at Austin for my B.S. in Electrical and Computer Engineering, with a certificate in Computer Science.
          In my spare time, I love reading, cooking, and playing games.
        </p>

        
        <section style={{ marginTop: '1rem' }}>
          <p>
            <strong>Contact me:</strong>
            <br />
            <Link href="mailto:maxzhou0030@gmail.com"
              className="custom-link">
              maxzhou0030@gmail.com
            </Link>
            <br />
            <strong>Find me online:</strong>
            <br />
            <Link
              href="https://www.linkedin.com/in/maxzhouece/"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-link"
            >
              My LinkedIn
            </Link>
            <br />
            
            <Link
              href="https://github.com/MaxZ0030"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-link"
            >
              My GitHub
            </Link>
          </p>
        </section>

        
        <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
          Copyright ©2025 All rights reserved | This website was developed/coded by me!
        </p>

      </main>
    </div>
  );
}