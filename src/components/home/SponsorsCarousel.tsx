import { useSponsors } from '../../hooks';

export function SponsorsCarousel() {
  const { data: sponsors } = useSponsors(true);

  const sortedSponsors = sponsors
    ? [...sponsors].sort((a, b) => a.display_order - b.display_order)
    : [];

  // Double the sponsors for seamless infinite scroll
  const allSponsors = [...sortedSponsors, ...sortedSponsors];

  if (sortedSponsors.length === 0) return null;

  return (
    <section className="py-[12px] bg-navy overflow-hidden">
      {/* Scrolling banner */}
      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div className="flex animate-scroll-left">
          {allSponsors.map((sponsor, index) => (
            <div
              key={`${sponsor.id}-${index}`}
              className="flex-shrink-0 mx-3"
            >
              {sponsor.website_url ? (
                <a
                  href={sponsor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-[100px] px-5 bg-white rounded-none shadow-sm flex items-center justify-center border border-gray-100 hover:border-navy/20 hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={sponsor.logo_url!}
                    alt={sponsor.name}
                    className="h-[78px] w-auto max-w-[210px] object-contain"
                  />
                </a>
              ) : (
                <div className="h-[100px] px-5 bg-white rounded-none shadow-sm flex items-center justify-center border border-gray-100 hover:border-navy/20 hover:shadow-md transition-all duration-300">
                  <img
                    src={sponsor.logo_url!}
                    alt={sponsor.name}
                    className="h-[78px] w-auto max-w-[210px] object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsorsCarousel;
