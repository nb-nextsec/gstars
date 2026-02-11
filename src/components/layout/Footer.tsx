import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top: Brand + tagline with socials */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
          <div className="space-y-3">
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

          {/* Quick Links & Contact side by side */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">Quick Links</h3>
              <ul className="space-y-2">
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
                  <Link to="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
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
