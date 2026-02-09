import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common';

// Sponsor logos from refs folder
const sponsors = [
  { name: 'Breakwater Hotel', logo: '/images/breakwater.avif' },
  { name: 'Meys Meats', logo: '/images/Meys-Logo-web_png.avif' },
  { name: 'Bunnings', logo: '/images/Bunnings-logo_edited.avif' },
  { name: 'Ballarine Village', logo: '/images/ballarine-village-footer-logo_edited_edi.avif' },
  { name: 'Fruit Biz', logo: '/images/fruit biz.avif' },
  { name: 'Geelong Plaster Cartage', logo: '/images/Geelong Plaster Cartage_edited_edited_ed.avif' },
  { name: 'Lektrix', logo: '/images/Lektrix_edited_edited.avif' },
  { name: "McHarry's Bus Lines", logo: '/images/McHarry\'s Bus Lines logo_edited_edited_p.avif' },
  { name: 'Repco', logo: '/images/repco.avif' },
  { name: 'Rotary Club', logo: '/images/rotary club_edited.avif' },
  { name: 'Winston', logo: '/images/WINSTON.avif' },
];

export function SponsorsCarousel() {
  // Double the sponsors for seamless infinite scroll
  const allSponsors = [...sponsors, ...sponsors];

  return (
    <section className="py-12 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Our Amazing Sponsors
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm">
            A huge thank you to the local businesses and organizations that make our programs possible!
          </p>
        </div>
      </div>

      {/* Scrolling banner */}
      <div className="relative py-4">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div className="flex animate-scroll-left">
          {allSponsors.map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="flex-shrink-0 mx-3"
            >
              <div className="h-36 px-8 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100 hover:border-navy/20 hover:shadow-md transition-all duration-300">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-28 w-auto max-w-[300px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <Link to="/sponsors">
          <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-navy" rightIcon={<ArrowRight size={16} />}>
            Meet All Our Sponsors
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default SponsorsCarousel;
