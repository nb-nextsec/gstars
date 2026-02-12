import { ArrowRight, Shirt, Star } from 'lucide-react';
import { Button } from '../components/common';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const SHOP_URL = 'https://geelong-all-abilities-sports-club.square.site/shop/apparel/O2EOSHH2WQPHMCCWJJLYN6BM?page=1&limit=30&sort_by=category_order&sort_order=asc';

export function ShopApparel() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Geelong Stars Apparel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Shop Apparel
            </h1>
            <p className="text-xl text-white/90">
              Wear your Stars pride — grab official Geelong Stars gear!
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-10">
            <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shirt className="w-8 h-8 text-navy" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Geelong Stars Apparel
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Show your support for the Geelong Stars with our official club
              apparel. Whether you're on the field, on the sideline, or out and
              about, rep the Stars and let everyone know you're part of
              something special.
            </p>
          </div>

          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" rightIcon={<ArrowRight size={20} />}>
              Shop Now
            </Button>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy to-navy-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-4 left-8 opacity-20">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Gear Up for the Stars!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Every purchase helps support our programs and the incredible
              athletes in our community. Look good, feel good, do good.
            </p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-yellow-400 text-navy hover:bg-yellow-300 font-bold"
                rightIcon={<ArrowRight size={20} />}
              >
                Browse Apparel
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopApparel;
