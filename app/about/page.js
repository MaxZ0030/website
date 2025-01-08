// app/about/page.js
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ position: 'relative', zIndex: 1, padding: '1rem' }}>
      <h1>About Me</h1>
      <p>
        Temporary!
      </p>
      <img 
        src="/assets/your-image.png" 
        alt="Dew" 
        style={{ width: '300px', borderRadius: '8px' }} 
      />

      <div style={{ marginTop: '2rem' }}>
        <Link 
          href="/" 
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
