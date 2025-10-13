import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import OrbScene from "../components/OrbScene";
import ContentContainer from "../components/ContentContainer";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Max Zhou",
  description: "My website!",
};

export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <body>
        
        
        
        <NavBar />
        <OrbScene />
        <ContentContainer>
          {children}
        </ContentContainer>
        
      </body>
    </html>
  );
}
