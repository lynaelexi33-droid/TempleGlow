import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-biblical-green text-biblical-cream py-4 px-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 border-b border-biblical-gold/20 shadow-md">
      <Link to="/" className="flex items-center gap-2 font-serif text-2xl italic hover:text-biblical-gold transition-colors mb-4 md:mb-0">
        <Leaf className="w-6 h-6 text-biblical-gold" />
        Temple Glow
      </Link>
      <div className="flex gap-8 text-xs uppercase tracking-widest font-bold">
        <Link 
          to="/" 
          className={`transition-colors hover:text-biblical-gold ${isActive('/') ? 'text-biblical-gold border-b border-biblical-gold' : ''}`}
        >
          Philosophy
        </Link>
        <Link 
          to="/store" 
          className={`transition-colors hover:text-biblical-gold ${isActive('/store') ? 'text-biblical-gold border-b border-biblical-gold' : ''}`}
        >
          Sanctuary Store
        </Link>
        <Link 
          to="/subscriptions" 
          className={`transition-colors hover:text-biblical-gold ${isActive('/subscriptions') ? 'text-biblical-gold border-b border-biblical-gold' : ''}`}
        >
          Subscriptions
        </Link>
        <Link 
          to="/admin" 
          className={`transition-colors hover:text-biblical-gold ${isActive('/admin') ? 'text-biblical-gold border-b border-biblical-gold' : ''}`}
        >
          Administration
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
