import React from 'react'

function Footer() {
  return (
    <div>
      <hr className="border-gray-300 dark:border-gray-700" />
      <footer className="footer footer-horizontal footer-center rounded p-10 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        
        {/* Navigation Links */}
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover hover:text-pink-500 transition">About us</a>
          <a className="link link-hover hover:text-pink-500 transition">Contact</a>
          <a className="link link-hover hover:text-pink-500 transition">Jobs</a>
          <a className="link link-hover hover:text-pink-500 transition">Press kit</a>
        </nav>

        {/* Social Media Icons */}
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a className="hover:text-pink-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                className="fill-current">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 
           2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
           4-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
            </a>
            <a className="hover:text-pink-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                className="fill-current">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.525.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.651.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.429.369.81 1.096.81 2.215 0 1.6-.015 2.885-.015 3.28 0 .319.21.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"></path>
              </svg></a>
            <a className="hover:text-pink-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                className="fill-current">
                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.85-3.037-1.851 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.369-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433c-1.144 0-2.067-.926-2.067-2.067 0-1.144.923-2.067 2.067-2.067 1.143 0 2.067.923 2.067 2.067 0 1.141-.924 2.067-2.067 2.067zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
               </svg>
            </a>
          </div>
        </nav>

        {/* Copyright */}
        <aside>
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} - All rights reserved by 
            <span className="text-pink-500 font-semibold"> Sandhya Bhakuni~the creator </span>
          </p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer
