import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import type { NavItem } from '../../types';

const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Club', href: '/our-club' },
  { label: 'Our Programs', href: '/programs' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Club Policies', href: '/club-policies' },
];

const moreNavItems: NavItem[] = [
  { label: 'News and Events', href: '/social' },
  { label: 'Photo Gallery', href: '/photo-gallery' },
  { label: 'Membership', href: '/membership' },
  { label: 'Thursday Meals', href: '/thursday-meals' },
  { label: 'Shop Apparel', href: '/shop-apparel' },
  { label: 'Partner With Us', href: '/partner-with-us' },
  { label: 'Contact', href: '/contact' },
];

const allNavItems: NavItem[] = [
  ...mainNavItems.slice(0, 3),
  ...moreNavItems,
  ...mainNavItems.slice(3),
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  // Get current path from window.location (works without React Router)
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isMoreActive = moreNavItems.some((item) => isActive(item.href));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-1">
        {mainNavItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-white/20 text-white'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}

        {/* More Dropdown */}
        <li ref={moreRef} className="relative">
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
              isMoreActive
                ? 'bg-white/20 text-white'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            More
            <ChevronDown size={14} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
          </button>
          {moreOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-navy-600 rounded-lg shadow-lg py-2 z-50">
              {moreNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-white hover:bg-white/10 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-navy-600 rounded-lg shadow-lg py-2 md:hidden z-50">
          <ul className="flex flex-col">
            {allNavItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
