import { Users, Trophy, Heart, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/common';

// Custom AFL Football icon
function AFLFootballIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="6" />
      <path d="M12 6v12" />
      <path d="M7 8.5c1.5 1 3.5 1.5 5 1.5s3.5-.5 5-1.5" />
      <path d="M7 15.5c1.5-1 3.5-1.5 5-1.5s3.5.5 5 1.5" />
    </svg>
  );
}

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_6f77b1dc166242098bc394d398c3deb2~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Youth%20Basketball_edited.jpg';
const BASKETBALL_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_800,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const programs = [
  {
    id: 'minis-basketball',
    title: "Mini's Basketball 🏀",
    subtitle: 'Ages 5-12',
    description: 'A fun, supportive environment where kids learn basketball fundamentals, teamwork, and sportsmanship. Every child is encouraged to participate and have a blast!',
    icon: Users,
    color: 'bg-orange-500',
    image: 'https://static.wixstatic.com/media/c23ea9_6f77b1dc166242098bc394d398c3deb2~mv2.jpg/v1/fill/w_600,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Youth%20Basketball_edited.jpg',
    features: [
      'Fun games and skill development',
      'Age-appropriate training',
      'Small group sizes for attention',
      'Positive, encouraging coaches',
      'Make new friends!',
    ],
    schedule: 'Saturdays, 9:00 AM - 10:30 AM',
  },
  {
    id: 'youth-football',
    title: 'Youth Football 🏈',
    subtitle: 'All Ages Welcome',
    description: 'Our flagship program! Inclusive football designed for participants of all abilities. Get active, have fun, and be part of our welcoming community where everyone belongs!',
    icon: AFLFootballIcon,
    color: 'bg-blue-500',
    image: BASKETBALL_IMAGE,
    features: [
      'Adapted activities for all abilities',
      'Supportive, trained staff',
      'Focus on fun and participation',
      'Build confidence and friendships',
      'Everyone is a star! ⭐',
    ],
    schedule: 'Thursdays, 5:00 PM - 6:30 PM',
  },
  {
    id: 'minis-golf',
    title: "Mini's Golf ⛳",
    subtitle: 'Ages 13+',
    description: 'Take your game to the next level! Develop advanced skills, compete in local leagues, and be part of a passionate golf community.',
    icon: Trophy,
    color: 'bg-green-500',
    image: BASKETBALL_IMAGE,
    features: [
      'Competitive and social options',
      'Advanced skill development',
      'Game play and tournaments',
      'Fitness and conditioning',
      'Team building activities',
    ],
    schedule: 'Wednesdays & Fridays, 6:00 PM - 8:00 PM',
  },
  {
    id: 'running-walking-group',
    title: 'Running/Walking Group 🏃',
    subtitle: 'All Ages',
    description: 'Relaxed, fun-focused activities perfect for those who want to get active without pressure. Great for beginners, families, or anyone who just wants to have a good time!',
    icon: Heart,
    color: 'bg-pink-500',
    image: BASKETBALL_IMAGE,
    features: [
      'No experience needed!',
      'Relaxed, friendly atmosphere',
      'All fitness levels welcome',
      'Great for families',
      'Social events and BBQs',
    ],
    schedule: 'Sunday mornings, 10:00 AM - 12:00 PM',
  },
];

export function Programs() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Geelong Stars Programs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Something For Everyone!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Programs 🌟
            </h1>
            <p className="text-xl text-white/90">
              Geelong All-Abilities Sports Club offers a range of programs to meet the needs
              of all of our members, no matter your age or ability. Get active, have fun,
              and build community through sports!
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Find Your Perfect Program</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Click on any program below to learn more about what we offer!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {programs.map((program) => (
              <a
                key={program.id}
                href={`#${program.id}`}
                className="block group"
              >
                <Card hover className="h-full text-center">
                  <div className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <program.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-1">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {program.subtitle}
                  </p>
                </Card>
              </a>
            ))}
          </div>

          {/* Detailed Program Sections */}
          <div className="space-y-24">
            {programs.map((program, index) => (
              <div
                key={program.id}
                id={program.id}
                className="scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center`}>
                        <program.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-navy">
                          {program.title}
                        </h2>
                        <p className="text-gray-500 font-medium">{program.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {program.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-gray-600">
                          <div className={`w-6 h-6 ${program.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-gray-600 mb-8 bg-gray-50 rounded-lg p-4">
                      <Calendar size={20} className="text-navy" />
                      <span className="font-medium">{program.schedule}</span>
                    </div>
                    <Link to="/contact">
                      <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                        Join This Program!
                      </Button>
                    </Link>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-auto"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${program.color.replace('bg-', 'from-')}/20 to-transparent`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Overview */}
      <section className="py-16 lg:py-24 bg-gray-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Weekly Schedule 📅
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's when our programs run. Can't make these times? Get in touch and we'll help you find a solution!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-navy to-navy-600 text-white">
                <tr>
                  <th className="px-6 py-5 text-left font-semibold">Program</th>
                  <th className="px-6 py-5 text-left font-semibold">Days</th>
                  <th className="px-6 py-5 text-left font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {programs.map((program) => {
                  const parts = program.schedule.split(', ');
                  const days = parts[0];
                  const time = parts[1] || '';
                  return (
                    <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${program.color} rounded-lg flex items-center justify-center`}>
                            <program.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-navy">{program.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-600 font-medium">{days}</td>
                      <td className="px-6 py-5 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          {time}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy to-navy-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative stars */}
            <div className="absolute top-4 left-8 text-4xl opacity-20">⭐</div>
            <div className="absolute bottom-4 right-8 text-4xl opacity-20">🌟</div>
            <div className="absolute top-1/2 right-1/4 text-2xl opacity-10">✨</div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join the Stars? 🌟
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We'd love to welcome you to our community! Get in touch to learn more,
              arrange a visit, or sign up for a program. Everyone is welcome!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-yellow-400 text-navy hover:bg-yellow-300 font-bold" rightIcon={<ArrowRight size={20} />}>
                  Contact Us Today
                </Button>
              </Link>
              <Link to="/our-club">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Programs;
