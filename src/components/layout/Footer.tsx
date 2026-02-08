import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.avif"
                alt="Geelong Stars"
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold">Geelong Stars</span>
            </Link>
            <p className="text-white/70 text-sm">
              Where everyone plays, everyone belongs! An all-abilities sports club
              building community through fun, friendship, and sport.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/p/Geelong-All-Abilities-Sports-Club-61563454708703/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/geelongstars"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/our-club" className="text-white/70 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-white/70 hover:text-white transition-colors text-sm">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/social" className="text-white/70 hover:text-white transition-colors text-sm">
                  Social & Events
                </Link>
              </li>
              <li>
                <Link to="/sponsors" className="text-white/70 hover:text-white transition-colors text-sm">
                  Our Sponsors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs#junior-basketball" className="text-white/70 hover:text-white transition-colors text-sm">
                  Junior Basketball
                </Link>
              </li>
              <li>
                <Link to="/programs#all-abilities" className="text-white/70 hover:text-white transition-colors text-sm">
                  All Abilities Sports
                </Link>
              </li>
              <li>
                <Link to="/programs#senior-basketball" className="text-white/70 hover:text-white transition-colors text-sm">
                  Senior Basketball
                </Link>
              </li>
              <li>
                <Link to="/programs#social-sports" className="text-white/70 hover:text-white transition-colors text-sm">
                  Social Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">
                  203 St Albans Road<br />
                  Thomson VIC 3219
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-white/70 flex-shrink-0" />
                <a href="mailto:info@geelongstars.com.au" className="text-white/70 hover:text-white transition-colors">
                  info@geelongstars.com.au
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-yellow-400 text-navy px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-300 transition-colors"
              >
                Say Hello!
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm flex items-center gap-1">
            &copy; {currentYear} Geelong Stars. Made with <Heart size={14} className="text-red-400" fill="currentColor" /> in Geelong
          </p>
          <Link to="/admin/login" className="text-white/50 text-sm hover:text-white">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
