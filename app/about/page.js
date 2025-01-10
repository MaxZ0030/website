// app/about/page.js
"use client";
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="content-card fade-in">
      <main style={{ position: 'relative', zIndex: 1, padding: '1rem' }}>
        <h1>About Me</h1>
        <br></br>
        <img
          src="/assets/self.jpg"
          alt="A picture of me"
          style={{ width: '300px', borderRadius: '8px' }}
        />
        <br></br>
        <br></br>
        <br></br>
        <p>
          Hello! My name is Max Zhou. I'm a former Software Development Engineer from Amazon Lab126.
          I went to the University of Texas at Austin for my B.S. in Electrical and Computer Engineering, with a certificate in Computer Science.
          In my spare time, I love reading, cooking, and playing games.
        </p>

        
        <section style={{ marginTop: '1rem' }}>
          <p>
            <strong>Contact me:</strong>
            <br />
            {/* Email */}
            <Link href="mailto:maxzhou0030@gmail.com"
              className="custom-link">
              maxzhou0030@gmail.com
            </Link>
            <br></br>
            <strong>Find me online:</strong>
            <br />
            {/* LinkedIn */}
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
          Copyright ©2025 All rights reserved | This website was made by me!
        </p>

      </main>
    </div>
  );
}
