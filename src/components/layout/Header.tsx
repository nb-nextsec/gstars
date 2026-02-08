import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header className="bg-navy sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
            <img
              src="/images/logo.avif"
              alt="Geelong Stars"
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold hidden sm:block">Geelong Stars</span>
          </Link>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default Header;
