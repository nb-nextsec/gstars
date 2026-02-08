import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Star, Accessibility } from 'lucide-react';
import { Button } from '../common';

const TEAM_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_800,h_500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const highlights = [
  {
    icon: Accessibility,
    title: 'All Abilities Welcome',
    description: 'Programs designed for participants of every ability level.',
  },
  {
    icon: Users,
    title: 'Inclusive Community',
    description: 'A welcoming environment where everyone belongs.',
  },
  {
    icon: Heart,
    title: 'Fun First',
    description: 'We believe sport should be enjoyable for everyone!',
  },
  {
    icon: Star,
    title: 'Build Confidence',
    description: 'Develop skills and friendships that last a lifetime.',
  },
];

export function WelcomeSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={TEAM_IMAGE}
                alt="Geelong Stars community"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-yellow-400 rounded-2xl p-6 shadow-lg hidden md:block">
              <p className="text-navy font-bold text-3xl">10+</p>
              <p className="text-navy/80 text-sm font-medium">Years of<br/>Community</p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-navy/10 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
              <span className="text-navy text-sm font-semibold">About Geelong Stars</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Where Everyone Gets to Play! 🌟
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <strong className="text-navy">Geelong All-Abilities Sports Club</strong> offers a range
              of programs to meet the needs of all of our members, no matter your age or ability.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              At Geelong Stars, everyone is encouraged to get active, have fun, and build community
              through sports! We believe that sport has the power to bring people together and create
              lasting friendships. Come join our family!
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/our-club">
              <Button rightIcon={<ArrowRight size={18} />}>
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
