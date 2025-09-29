import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <hr className="border-gray-300 dark:border-gray-700" />
      <footer className="footer footer-horizontal footer-center rounded p-10 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        
        {/* Navigation Links */}
        <nav className="grid grid-flow-col gap-4">
          <Link to="/about" className="link link-hover hover:text-pink-500 transition">About us</Link>
          <Link to="/contact" className="link link-hover hover:text-pink-500 transition">Contact</Link>
          <Link to="/jobs" className="link link-hover hover:text-pink-500 transition">Jobs</Link>
          <Link to="/press-kit" className="link link-hover hover:text-pink-500 transition">Press kit</Link>
        </nav>

        {/* Social Media Icons */}
        <nav>
          <div className="grid grid-flow-col gap-4 mt-4">
            {/* Email */}
            <a href="mailto:sandhyabhakuni2003@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com/SBhakuni10" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.385-1.333-1.754-1.333-1.754-1.088-.744.082-.729.082-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.774.418-1.305.762-1.605-2.665-.3-5.467-1.334-5.467-5.932 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.288-1.552 3.294-1.23 3.294-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.628-5.479 5.922.43.37.814 1.096.814 2.21v3.283c0 .32.218.694.824.576C20.565 21.796 24 17.296 24 12c0-6.63-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/sandhya-bhakuni-323b37265" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48c0 1.64 1.34 2.98 2.98 2.98s2.98-1.34 2.98-2.98C7.96 4.84 6.62 3.5 4.98 3.5zM2.4 21.5h5.16v-12H2.4v12zm7.2-12h4.92v1.68h.07c.69-1.3 2.38-2.68 4.9-2.68 5.24 0 6.2 3.44 6.2 7.92v9.08h-5.16v-8.04c0-1.92-.04-4.4-2.68-4.4-2.68 0-3.08 2.08-3.08 4.24v8.2h-5.16v-12z"/>
              </svg>
            </a>
          </div>
        </nav>

        {/* Copyright */}
        <aside className="mt-6">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
            <span className="text-pink-500 font-semibold">Sandhya Bhakuni~the creator</span>
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
