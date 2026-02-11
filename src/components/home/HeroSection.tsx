import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Users } from 'lucide-react';
import { Button } from '../common';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1920,h_780,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export function HeroSection({
  title = 'Welcome to Geelong Stars!',
  subtitle = "Geelong's All-Abilities Sports Club, where everyone is welcome!",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Geelong Stars All-Abilities Sports Club"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/20" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side — left half */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-5">
              {subtitle}
            </p>
            <p className="text-base text-white/75 mb-6 leading-relaxed">
              Geelong All-Abilities Sports Club offers a range of programs to meet the needs
              of all of our members, no matter your age or ability. At Geelong Stars,
              everyone is encouraged to <span className="text-yellow-400 font-semibold">get active</span>,
              <span className="text-yellow-400 font-semibold"> have fun</span>, and
              <span className="text-yellow-400 font-semibold"> build community</span> through sports!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-5 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-semibold">All Abilities</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="text-white text-sm font-semibold">All Ages Welcome</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
                <span className="text-white text-sm font-semibold">Inclusive & Fun</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/programs">
                <Button size="lg" className="bg-yellow-400 text-navy hover:bg-yellow-300 font-bold" rightIcon={<ArrowRight size={20} />}>
                  Explore Programs
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy font-semibold">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Right half — empty, lets the background photo show through */}
          <div />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
