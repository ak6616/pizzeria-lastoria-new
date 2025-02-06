import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import React from 'react';

import { Pizza, Beef, Coffee } from 'lucide-react';

const BackgroundIcons = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[Pizza, Beef, Coffee].map((Icon, index) => (
        Array.from({ length: 10 }).map((_, i) => (
          <Icon
            key={`${index}-${i}`}
            className="absolute text-white transform rotate-45 animate-floatCycle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -100}%`,
              fontSize: `${Math.random() * 2 + 1}rem`,
              animationDuration: `${Math.random() * 3 + 5}s`, // Losowe prędkości
              animationDelay: `${Math.random() * 2}s`, // Losowe opóźnienia
            }}
          />
        ))
      ))}
    </div>
  );
};

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-yellow-500 to-green-600 relative">
      <BackgroundIcons />
      <Navbar />
      <main className="container mx-auto px-4 py-8 relative">
        <Outlet />
      </main>
    </div>
  );
}