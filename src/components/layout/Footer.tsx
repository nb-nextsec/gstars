import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top row: Brand, Quick Links, Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand + tagline + socials */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.avif"
                alt="Geelong Stars"
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold">Geelong Stars</span>
            </Link>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed">
              Where everyone plays, everyone belongs! An all-abilities sports club
              building community through fun, friendship, and sport.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/p/Geelong-All-Abilities-Sports-Club-61563454708703/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com/geelongstars"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/our-club" className="text-white/70 hover:text-white transition-colors text-sm">
                  Our Club
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-white/70 hover:text-white transition-colors text-sm">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/social" className="text-white/70 hover:text-white transition-colors text-sm">
                  News and Events
                </Link>
              </li>
              <li>
                <Link to="/photo-gallery" className="text-white/70 hover:text-white transition-colors text-sm">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/sponsors" className="text-white/70 hover:text-white transition-colors text-sm">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-white/70 hover:text-white transition-colors text-sm">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/thursday-meals" className="text-white/70 hover:text-white transition-colors text-sm">
                  Thursday Meals
                </Link>
              </li>
              <li>
                <Link to="/shop-apparel" className="text-white/70 hover:text-white transition-colors text-sm">
                  Shop Apparel
                </Link>
              </li>
              <li>
                <Link to="/partner-with-us" className="text-white/70 hover:text-white transition-colors text-sm">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">
                  203 St Albans Road<br />
                  Thomson VIC 3219
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-white/70 flex-shrink-0" />
                <a href="tel:0403017977" className="text-white/70 hover:text-white transition-colors">
                  0403 017 977
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-white/70 flex-shrink-0" />
                <a href="mailto:info@geelongstars.com.au" className="text-white/70 hover:text-white transition-colors">
                  info@geelongstars.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm flex items-center gap-1">
            &copy; {currentYear} Geelong Stars. Made with <Heart size={14} className="text-red-400" fill="currentColor" /> in Geelong
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms-of-service" className="text-white/50 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-white/50 text-sm hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link to="/privacy-policy" className="text-white/50 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
