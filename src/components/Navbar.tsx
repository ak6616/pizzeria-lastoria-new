import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pizza, ChevronDown } from 'lucide-react';

const locations = [
  { name: 'Haczów', href: '/menu/haczow' },
  { name: 'Miejsce Piastowe', href: '/menu/miejsce-piastowe' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/10 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="logo.png"
              alt="logo-lastoria"
              className="flex items-center space-x-2 w-[60px] md:w-[60px] lg:w-[60px] h-auto"
            />
            {/* <Pizza className="h-8 w-8 text-white" /> */}
            <span className="text-xl font-bold text-white">
              Pizzeria Lastoria
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Home
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-1 text-white hover:text-yellow-200 transition-colors focus:outline-none"
              >
                <span>Menu</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isMenuOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                  {locations.map((location) => (
                    <Link
                      key={location.href}
                      to={location.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-yellow-50 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Galeria
            </Link>
            <Link
              to="/news"
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Aktualności
            </Link>
            <Link
              to="/order"
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Zamów online
            </Link>
            <Link
              to="/admin"
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Panel Admina
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
