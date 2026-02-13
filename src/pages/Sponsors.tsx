import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const sponsors = [
  {
    id: 11,
    name: 'Sipcam',
    description: 'A leading crop protection and specialty chemicals company. Proud to invest in community wellbeing and all-abilities sport.',
    logo_url: 'https://cdn.prod.website-files.com/68a52a259620521f4aec8c70/68a6f3dbea4151d7018b48e2_Sipcam-Logo-Full-Clr-removebg-preview.png',
    website_url: 'https://sipcam.com.au/',
  },
  {
    id: 1,
    name: 'Breakwater Hotel',
    description: 'A proud Geelong hospitality venue supporting local sport and community. The Breakwater Hotel is a valued partner of Geelong Stars.',
    logo_url: '/images/breakwater.avif',
    website_url: 'https://www.facebook.com/groups/21807272626',
  },
  {
    id: 2,
    name: 'Meys Meats',
    description: 'Quality local butcher providing the finest meats in Geelong. Proud supporters of community sport and all-abilities inclusion.',
    logo_url: '/images/Meys-Logo-web_png.avif',
    website_url: 'https://meysmeats.com.au/',
  },
  {
    id: 3,
    name: 'Bunnings',
    description: 'Australia\'s leading home improvement and outdoor living retailer. Bunnings is proud to support local community clubs and organisations.',
    logo_url: '/images/Bunnings-logo_edited.avif',
    website_url: 'https://www.bunnings.com.au/',
  },
  {
    id: 4,
    name: 'Bellarine Village',
    description: 'A welcoming shopping destination on the Bellarine Peninsula. Supporting local sport and the Geelong Stars community.',
    logo_url: '/images/ballarine-lotto.jpg',
    website_url: 'https://bellarinevillage.com.au/stores/bellarine-village-lotto/',
  },
  {
    id: 5,
    name: 'Fruit Biz',
    description: 'Fresh fruit and produce supplier in the Geelong region. Keeping our athletes fuelled with healthy, quality produce.',
    logo_url: '/images/fruit biz.avif',
    website_url: 'https://www.facebook.com/FruitBiz/',
  },
  {
    id: 6,
    name: 'Geelong Plaster Cartage',
    description: 'Reliable plaster and building materials cartage across the Geelong region. Proud to support all-abilities sport in the community.',
    logo_url: '/images/Geelong Plaster Cartage_edited_edited_ed.avif',
    website_url: null,
  },
  {
    id: 7,
    name: 'Lektrix',
    description: 'Professional electrical services for homes and businesses in Geelong. Powering our community on and off the field.',
    logo_url: '/images/Lektrix_edited_edited.avif',
    website_url: 'https://lektrix.com.au/',
  },
  {
    id: 8,
    name: "McHarry's Bus Lines",
    description: 'Geelong\'s trusted public transport provider. Helping our community get where they need to go, including to training and game days!',
    logo_url: "/images/McHarry's Bus Lines logo_edited_edited_p.avif",
    website_url: 'https://mcharrys.com.au/',
  },
  {
    id: 9,
    name: 'Repco',
    description: 'Australia\'s leading auto parts and accessories retailer. Supporting the Geelong Stars community and keeping everyone on the road.',
    logo_url: '/images/repco.avif',
    website_url: 'https://www.repco.com.au/',
  },
  {
    id: 10,
    name: 'Rotary Club',
    description: 'A global network of community leaders dedicated to service above self. The Rotary Club proudly supports inclusive sport in Geelong.',
    logo_url: '/images/rotary club_edited.avif',
    website_url: 'https://geelongrotary.org.au/',
  },
  {
    id: 13,
    name: 'Hawk & Co',
    description: 'A trusted local handyman service in Geelong. Hawk & Co is a proud supporter of Geelong Stars and all-abilities sport in the community.',
    logo_url: '/images/hawk-and-co.jpg',
    website_url: 'https://www.facebook.com/hawkcohandyman/',
  },
  {
    id: 14,
    name: 'Wade 2 Go',
    description: 'A reliable local handyman service in the Geelong region. Wade 2 Go is a proud supporter of Geelong Stars and inclusive sport in the community.',
    logo_url: '/images/wade-2-go.jpg',
    website_url: 'https://www.facebook.com/Wade2GoHandyman/',
  },
  {
    id: 12,
    name: 'Winston & Co Cafe and Takeaway',
    description: 'A local cafe and takeaway serving delicious food and coffee to the Geelong community. Winston & Co is a proud supporter of Geelong Stars and inclusive sport.',
    logo_url: '/images/winston-logo.jpg',
    website_url: 'https://www.facebook.com/winstonandcocafe/about',
  },
  {
    id: 16,
    name: 'Phoenix Truck Bodies',
    description: 'Specialist truck body builders based in Geelong. Phoenix Truck Bodies is a proud supporter of Geelong Stars and all-abilities sport in the community.',
    logo_url: '/images/phoenix.jpg',
    website_url: 'https://phoenixtruckbodies.com.au/',
  },
  {
    id: 17,
    name: "Jim's Building Inspections",
    description: "Professional building and pest inspections in the Geelong region. Jim's Building Inspections is a proud supporter of Geelong Stars and all-abilities sport in the community.",
    logo_url: '/images/jims-building.jpg',
    website_url: 'https://jimsbuildinginspections.com.au/local/vic/geelong/',
  },
  {
    id: 15,
    name: 'Geelong Connected Communities',
    description: 'Geelong Connected Communities provides grants to help Not for Profit organisations fund programs that strengthen and enrich the Geelong community. We are grateful for their support in helping Geelong Stars deliver inclusive, all-abilities sport.',
    logo_url: '/images/geelong-connected-communities.jpg',
    website_url: 'https://www.geelongconnectedcommunities.com.au/',
  },
];

export function Sponsors() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Geelong Stars Sponsors"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Sponsors
            </h1>
            <p className="text-xl text-white/90">
              Thank you to our amazing sponsors and partners whose generous support
              makes our programs and community activities possible.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor) => {
              const cardContent = (
                <>
                  <div className="h-56 bg-gray-50 flex items-center justify-center p-4">
                    {sponsor.logo_url ? (
                      <img
                        src={sponsor.logo_url}
                        alt={sponsor.name}
                        className="h-44 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-navy/70 text-center">
                        {sponsor.name}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-accent transition-colors">
                      {sponsor.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {sponsor.description}
                    </p>
                  </div>
                </>
              );

              return sponsor.website_url ? (
                <a
                  key={sponsor.id}
                  href={sponsor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {cardContent}
                </a>
              ) : (
                <div
                  key={sponsor.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-navy to-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Become a Sponsor
              </h2>
              <p className="text-white/90 mb-6">
                Partner with Geelong Stars and support the development of athletes
                in our community. We offer various sponsorship packages to suit
                businesses of all sizes.
              </p>
              <p className="text-white/90 mb-8">
                As a sponsor, you'll receive brand exposure, community recognition,
                and the satisfaction of knowing you're making a real difference in
                the lives of many local families, by helping to make sport and
                recreation activities accessible for them.
              </p>
              <Link to="/partner-with-us">
                <Button className="bg-yellow-400 text-navy hover:bg-yellow-300 font-bold" rightIcon={<ArrowRight size={18} />}>
                  Partner With Us
                </Button>
              </Link>
            </div>
            <div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Sponsorship Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90">Logo placement on club website and social media</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90">Recognition at club events and functions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90">Signage opportunities at Stars HQ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90">Networking opportunities with other sponsors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90">Community goodwill and brand association</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Thank You!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To all our sponsors, partners, and supporters - your contributions make
            it possible for us to provide quality sporting programs and build a
            stronger community. We couldn't do it without you!
          </p>
        </div>
      </section>
    </>
  );
}

export default Sponsors;
