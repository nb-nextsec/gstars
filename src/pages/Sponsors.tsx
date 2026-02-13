import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Loading } from '../components/common';
import { useSponsors } from '../hooks';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

export function Sponsors() {
  const { data: sponsors, isLoading, error } = useSponsors(true);

  const sortedSponsors = sponsors
    ? [...sponsors].sort((a, b) => a.display_order - b.display_order)
    : [];

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
          {isLoading ? (
            <Loading text="Loading sponsors..." />
          ) : error ? (
            <p className="text-center text-red-600">Failed to load sponsors. Please try again later.</p>
          ) : sortedSponsors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedSponsors.map((sponsor) => {
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
                      {sponsor.description && (
                        <p className="text-gray-600 leading-relaxed">
                          {sponsor.description}
                        </p>
                      )}
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
          ) : (
            <p className="text-center text-gray-500">No sponsors to display.</p>
          )}
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
