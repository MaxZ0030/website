// src/app/layout.js

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './globals.css';          
import NavBar from '../components/NavBar';
import OrbScene from '../components/OrbScene';
import FadeContainer from '../components/FadeContainer';

export const metadata = {
  title: 'Dark Mode with Orb',
  description: 'My Next.js site with a Three.js orb and a hover navbar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        
        
        <OrbScene />

        
        <NavBar />
        <FadeContainer>
        <main className="relative z-10">
          {children}
        </main>    
        </FadeContainer>
        
        
      </body>
    </html>
  );
}
