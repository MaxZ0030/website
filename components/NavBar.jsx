"use client"; 
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { useEffect } from 'react';

export default function NavBar() {
  const pathname = usePathname(); 
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <nav className="navbar navbar-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          Max Zhou
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href="/"
                
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className={`nav-link ${pathname === "/about" ? "active" : ""}`}
                aria-current={pathname === "/about" ? "page" : undefined}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/projects"
                className={`nav-link ${pathname === "/projects" ? "active" : ""}`}
                aria-current={pathname === "/projects" ? "page" : undefined}
              >
                Projects
              </Link>
            </li>
            {/* 
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                aria-current={pathname === "/contact" ? "page" : undefined}
              >
                Contact
              </Link>
            </li>
             */}
            <li className="nav-item">
              <Link
                href="/resume"
                className={`nav-link ${pathname === "/resume" ? "active" : ""}`}
                aria-current={pathname === "/resume" ? "page" : undefined}
              >
                Resume
              </Link>
            </li>

            {/* <li className="nav-item">
              <a 
                href="/Official_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-link"
              >
                Resume
              </a>
            </li> */}

          </ul>
        </div>
      </div>
    </nav>
  );
}
