import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Loading } from '../components/common';
import { SponsorGrid } from '../components/sponsors';
import { useSponsors } from '../hooks';
import type { Sponsor } from '../types';

// Sample sponsors for when API is not available
const sampleSponsors: Sponsor[] = [
  {
    id: 1,
    name: 'Geelong Business Co',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'gold',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Local Sports Store',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'gold',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Community Bank',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'silver',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Fitness Plus',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'silver',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Health & Physio',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'silver',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'The Local Cafe',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'bronze',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Pizza Palace',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'bronze',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: 'Garden Supplies',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'bronze',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 9,
    name: 'Auto Service',
    logo_url: null,
    website_url: 'https://example.com',
    tier: 'bronze',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export function Sponsors() {
  const { data: sponsors, isLoading } = useSponsors(true);

  const displaySponsors = sponsors && sponsors.length > 0 ? sponsors : sampleSponsors;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Sponsors
            </h1>
            <p className="text-xl text-white/80">
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
          ) : (
            <SponsorGrid sponsors={displaySponsors} showTierHeaders={true} />
          )}
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="py-16 lg:py-24 bg-gray-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                  Become a Sponsor
                </h2>
                <p className="text-gray-600 mb-6">
                  Partner with Geelong Stars and support the development of athletes
                  in our community. We offer various sponsorship packages to suit
                  businesses of all sizes.
                </p>
                <p className="text-gray-600 mb-8">
                  As a sponsor, you'll receive brand exposure, community recognition,
                  and the satisfaction of knowing you're making a real difference in
                  the lives of local athletes.
                </p>
                <Link to="/contact">
                  <Button rightIcon={<ArrowRight size={18} />}>
                    Enquire About Sponsorship
                  </Button>
                </Link>
              </div>
              <div>
                <div className="bg-gray-bg rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-navy mb-6">
                    Sponsorship Benefits
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Logo placement on club website and social media</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Recognition at club events and functions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Signage opportunities at training and game days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Networking opportunities with other sponsors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Community goodwill and brand association</span>
                    </li>
                  </ul>
                </div>
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
