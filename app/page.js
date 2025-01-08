// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 1, padding: '1rem' }}>
      <h1>Welcome to my site!</h1>
      <p>
        Under construction!
      </p>
      
      
      <Link 
        href="/about" 
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        Go to About
      </Link>
    </main>
  );
}
