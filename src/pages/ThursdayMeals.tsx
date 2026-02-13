import { ArrowRight, UtensilsCrossed, Clock, MapPin } from 'lucide-react';
import { Button } from '../components/common';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const ORDER_URL = 'https://geelong-all-abilities-sports-club.square.site/shop/meals/JE2M5HD7D5O7EEGSQ52ZQE5K?page=1&limit=30&sort_by=category_order&sort_order=asc';

export function ThursdayMeals() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Thursday Night Meals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Thursday Night Meals
            </h1>
            <p className="text-xl text-white/90">
              Great food, great company — join us every Thursday evening at Stars HQ!
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Stars Meals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every Thursday night, the Geelong Stars community comes together to
              share a meal at Stars HQ. It's a chance to catch up with friends,
              meet new faces, and enjoy a delicious feed in a welcoming environment.
              Remember to order your meals via the below link each Wednesday before 5:00 PM.
            </p>
          </div>

          {/* Details */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">When</h3>
                <p className="text-gray-600 text-sm">Every Thursday</p>
                <p className="text-gray-600 text-sm">Doors open at 5:00 PM</p>
                <p className="text-gray-600 text-sm">Meals served from 6:00 PM</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">Where</h3>
                <p className="text-gray-600 text-sm">Stars HQ</p>
                <p className="text-gray-600 text-sm">St Albans Reserve</p>
                <p className="text-gray-600 text-sm">203 St Albans Road, Thomson VIC 3219</p>
              </div>
            </div>
          </div>

          {/* Order CTA */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Order your meals ahead of time so we can have everything ready for you!
            </p>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                Order Meals
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy to-navy-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Come Hungry, Leave Happy!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Everyone is welcome at our Thursday Night Meals. Bring your family,
              bring your friends — there's always room at the table.
            </p>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-yellow-400 text-navy hover:bg-yellow-300 font-bold"
                rightIcon={<ArrowRight size={20} />}
              >
                Order Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ThursdayMeals;
