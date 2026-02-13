
// Sponsor logos from refs folder
const sponsors = [
  { name: 'Sipcam', logo: 'https://cdn.prod.website-files.com/68a52a259620521f4aec8c70/68a6f3dbea4151d7018b48e2_Sipcam-Logo-Full-Clr-removebg-preview.png', url: 'https://sipcam.com.au/' },
  { name: 'Breakwater Hotel', logo: '/images/breakwater.avif', url: 'https://www.facebook.com/groups/21807272626' },
  { name: 'Meys Meats', logo: '/images/Meys-Logo-web_png.avif', url: 'https://meysmeats.com.au/' },
  { name: 'Bunnings', logo: '/images/Bunnings-logo_edited.avif', url: 'https://www.bunnings.com.au/' },
  { name: 'Bellarine Village', logo: '/images/ballarine-lotto.jpg', url: 'https://bellarinevillage.com.au/stores/bellarine-village-lotto/' },
  { name: 'Fruit Biz', logo: '/images/fruit biz.avif', url: 'https://www.facebook.com/FruitBiz/' },
  { name: 'Geelong Plaster Cartage', logo: '/images/Geelong Plaster Cartage_edited_edited_ed.avif', url: null },
  { name: 'Lektrix', logo: '/images/Lektrix_edited_edited.avif', url: 'https://lektrix.com.au/' },
  { name: "McHarry's Bus Lines", logo: '/images/McHarry\'s Bus Lines logo_edited_edited_p.avif', url: 'https://mcharrys.com.au/' },
  { name: 'Repco', logo: '/images/repco.avif', url: 'https://www.repco.com.au/' },
  { name: 'Rotary Club', logo: '/images/rotary club_edited.avif', url: 'https://geelongrotary.org.au/' },
  { name: 'Hawk & Co', logo: '/images/hawk-and-co.jpg', url: 'https://www.facebook.com/hawkcohandyman/' },
  { name: 'Wade 2 Go', logo: '/images/wade-2-go.jpg', url: 'https://www.facebook.com/Wade2GoHandyman/' },
  { name: 'Winston & Co Cafe and Takeaway', logo: '/images/winston-logo.jpg', url: 'https://www.facebook.com/winstonandcocafe/about' },
  { name: 'Phoenix Truck Bodies', logo: '/images/phoenix.jpg', url: 'https://phoenixtruckbodies.com.au/' },
  { name: "Jim's Building Inspections", logo: '/images/jims-building.jpg', url: 'https://jimsbuildinginspections.com.au/local/vic/geelong/' },
  { name: 'Geelong Connected Communities', logo: '/images/geelong-connected-communities.jpg', url: 'https://www.geelongconnectedcommunities.com.au/' },
];

export function SponsorsCarousel() {
  // Double the sponsors for seamless infinite scroll
  const allSponsors = [...sponsors, ...sponsors];

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
              key={`${sponsor.name}-${index}`}
              className="flex-shrink-0 mx-3"
            >
              {sponsor.url ? (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-[100px] px-5 bg-white rounded-none shadow-sm flex items-center justify-center border border-gray-100 hover:border-navy/20 hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-[78px] w-auto max-w-[210px] object-contain"
                  />
                </a>
              ) : (
                <div className="h-[100px] px-5 bg-white rounded-none shadow-sm flex items-center justify-center border border-gray-100 hover:border-navy/20 hover:shadow-md transition-all duration-300">
                  <img
                    src={sponsor.logo}
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
