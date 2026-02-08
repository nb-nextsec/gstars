import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common';

const programs = [
  {
    id: 'junior-basketball',
    title: 'Junior Basketball 🏀',
    ageGroup: 'Ages 5-12',
    description: 'A fun, supportive environment where kids learn basketball fundamentals, teamwork, and sportsmanship. Every child is encouraged to participate and grow!',
    image: 'https://static.wixstatic.com/media/c23ea9_6f77b1dc166242098bc394d398c3deb2~mv2.jpg/v1/fill/w_600,h_684,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Youth%20Basketball_edited.jpg',
    color: 'from-orange-400 to-pink-500',
    emoji: '🌟',
  },
  {
    id: 'all-abilities',
    title: 'All Abilities Sports 💪',
    ageGroup: 'All Ages',
    description: 'Inclusive programs designed for participants of all abilities. Get active, have fun, and be part of our welcoming community where everyone belongs!',
    image: 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_600,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg',
    color: 'from-blue-400 to-purple-500',
    emoji: '⭐',
  },
  {
    id: 'senior-basketball',
    title: 'Senior Basketball 🏆',
    ageGroup: 'Ages 13+',
    description: 'Take your game to the next level! Develop advanced skills, compete in local leagues, and be part of a passionate basketball community.',
    image: 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_600,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg',
    color: 'from-green-400 to-teal-500',
    emoji: '🚀',
  },
];

export function FeaturedPrograms() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="text-yellow-700 text-sm font-semibold">Something For Everyone!</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Our Programs 🎉
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Geelong All-Abilities Sports Club offers programs to meet the needs of all members,
            no matter your age or ability. Get active, have fun, and build community through sports!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program) => (
            <Link
              key={program.id}
              to={`/programs#${program.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold text-navy">{program.ageGroup}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 text-4xl">
                    {program.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-accent transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 flex-1 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="mt-4 flex items-center text-accent font-semibold group-hover:text-accent-dark">
                    Learn More <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/programs">
            <Button size="lg" className="bg-navy hover:bg-navy-600 font-bold" rightIcon={<ArrowRight size={18} />}>
              Explore All Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedPrograms;
