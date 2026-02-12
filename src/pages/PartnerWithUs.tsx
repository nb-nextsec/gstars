import { ArrowRight, Users, Heart } from 'lucide-react';
import { Button } from '../components/common';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const PARTNERSHIP_URL = 'https://geelong-all-abilities-sports-club.square.site/shop/partnerships/UBOT4MYM7LXY4LJSIWXAELK2?page=1&limit=30&sort_by=category_order&sort_order=asc';

export function PartnerWithUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Partner with Geelong Stars"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Partner With Us
            </h1>
            <p className="text-xl text-white/90">
              Join forces with the Geelong Stars and help make a real difference
              in the lives of people with all abilities.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-10">
            <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-navy" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Become a Partner
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              The Geelong Stars rely on the generous support of local businesses
              and organisations to keep our programs running and accessible for
              everyone. By partnering with us, you're investing in an inclusive
              community where sport brings people together regardless of ability.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a small business or a large organisation, there are
              partnership opportunities to suit every level. Your support helps
              fund our programs, equipment, venues, and community events — and
              in return, your brand will be proudly associated with one of
              Geelong's most impactful grassroots sporting clubs.
            </p>
          </div>

          <a
            href={PARTNERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" rightIcon={<ArrowRight size={20} />}>
              View Partnerships
            </Button>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy to-navy-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-4 left-8 opacity-20">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Together We're Stronger
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Your partnership doesn't just support a club — it supports an
              entire community of athletes, families, and volunteers who believe
              everyone deserves a chance to play.
            </p>
            <a
              href={PARTNERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-yellow-400 text-navy hover:bg-yellow-300 font-bold"
                rightIcon={<ArrowRight size={20} />}
              >
                Partner With Us Today
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default PartnerWithUs;
