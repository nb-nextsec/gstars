import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common';

const BACKGROUND_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const programs = [
  {
    id: 'junior-basketball',
    title: "Mini's Basketball 🏀",
    ageGroup: 'Ages 5-12',
    description: 'A fun, supportive environment where kids learn basketball fundamentals, teamwork, and sportsmanship. Every child is encouraged to participate and grow!',
    image: '/images/basketball minis 1.jpg',
    color: 'from-orange-400 to-pink-500',
  },
  {
    id: 'youth-football',
    title: 'Youth Football 🏈',
    ageGroup: 'Ages 12+',
    description: 'Our flagship program! Inclusive football designed for participants of all abilities. Get active, have fun, and be part of our welcoming community where everyone belongs!',
    image: '/images/Football 1.jpg',
    color: 'from-green-400 to-teal-500',
  },
  {
    id: 'minis-golf',
    title: "Mini's Golf ⛳",
    ageGroup: 'Ages 5-12',
    description: 'A fun introduction to golf for young children of all abilities. Learn the basics in a supportive, low-pressure environment where every swing is celebrated!',
    image: '/images/Golf 1.jpg',
    color: 'from-yellow-400 to-amber-500',
  },
];

export function FeaturedPrograms() {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="absolute inset-0">
        <img
          src={BACKGROUND_IMAGE}
          alt="Geelong Stars programs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Just a sample of our programs...
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Geelong All-Abilities Sports Club offers a range of programs to meet the needs of all members,
            no matter your age or ability. Get active, have fun, and build community through sports!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`} />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-navy mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 flex-1 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/programs">
            <Button size="lg" className="bg-yellow-400 text-navy hover:bg-yellow-300 font-bold" rightIcon={<ArrowRight size={18} />}>
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedPrograms;
