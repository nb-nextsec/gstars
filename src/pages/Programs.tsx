import { Users, Trophy, Heart, Calendar, ArrowRight, Zap, Shield, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';

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

const programs = [
  {
    id: 'minis-basketball',
    title: "Mini's Basketball",
    subtitle: 'Ages 5-12',
    description: 'A fun, supportive environment where kids learn basketball fundamentals, teamwork, and sportsmanship. Every child is encouraged to participate and have a blast!',
    icon: Users,
    color: 'bg-orange-500',
    gradientColor: 'from-orange-400 to-pink-500',
    image: '/images/basketball minis 1.jpg',
    schedule: 'Saturdays, 9:00 AM - 10:30 AM',
  },
  {
    id: 'youth-basketball',
    title: 'Youth Basketball',
    subtitle: 'Ages 12+',
    description: 'Take your basketball skills to the next level! Our youth program focuses on skill development, teamwork, and friendly competition in an inclusive and supportive environment.',
    icon: Users,
    color: 'bg-amber-500',
    gradientColor: 'from-amber-400 to-orange-500',
    image: '/images/Basketball 1.jpg',
    schedule: 'TBA',
  },
  {
    id: 'minis-football',
    title: 'Minis Football',
    subtitle: 'Ages 5-12',
    description: 'A fun introduction to football for our youngest stars! Kids develop coordination, teamwork, and confidence through age-appropriate activities in a supportive, inclusive environment.',
    icon: AFLFootballIcon,
    color: 'bg-green-500',
    gradientColor: 'from-green-400 to-teal-500',
    image: '/images/Football 1.jpg',
    schedule: 'TBA',
  },
  {
    id: 'youth-football',
    title: 'Youth Football',
    subtitle: 'Ages 12+',
    description: 'Our flagship program! Inclusive football designed for participants of all abilities. Get active, have fun, and be part of our welcoming community where everyone belongs!',
    icon: AFLFootballIcon,
    color: 'bg-blue-500',
    gradientColor: 'from-blue-400 to-indigo-500',
    image: '/images/Football 3.jpg',
    schedule: 'Thursdays, 5:00 PM - 6:30 PM',
  },
  {
    id: 'minis-golf',
    title: "Mini's Golf",
    subtitle: 'Ages 13+',
    description: 'Take your game to the next level! Develop advanced skills, compete in local leagues, and be part of a passionate golf community.',
    icon: Trophy,
    color: 'bg-green-500',
    gradientColor: 'from-emerald-400 to-green-500',
    image: '/images/Golf 1.jpg',
    schedule: 'Wednesdays & Fridays, 6:00 PM - 8:00 PM',
  },
  {
    id: 'youth-golf',
    title: 'Youth Golf',
    subtitle: 'Ages 12+',
    description: 'Build on your golfing skills in a fun, inclusive setting! Our youth golf program helps participants develop technique, confidence, and a love for the game.',
    icon: Trophy,
    color: 'bg-lime-500',
    gradientColor: 'from-lime-400 to-green-500',
    image: '/images/Golf Open 7.jpg',
    schedule: 'TBA',
  },
  {
    id: 'running-walking-group',
    title: 'Running/Walking Group',
    subtitle: 'All Ages',
    description: 'Relaxed, fun-focused activities perfect for those who want to get active without pressure. Great for beginners, families, or anyone who just wants to have a good time!',
    icon: Heart,
    color: 'bg-pink-500',
    gradientColor: 'from-pink-400 to-rose-500',
    image: '/images/Run & walk club 1.jpg',
    schedule: 'Sunday mornings, 10:00 AM - 12:00 PM',
  },
  {
    id: 'minis-little-athletics',
    title: 'Minis Little Athletics',
    subtitle: 'Ages 5-12',
    description: 'An exciting introduction to athletics for young stars! Kids develop coordination, speed, and confidence through fun track and field activities in a supportive, inclusive environment.',
    icon: Zap,
    color: 'bg-yellow-500',
    gradientColor: 'from-yellow-400 to-amber-500',
    image: '/images/Minis Aths 10.jpg',
    schedule: 'Saturdays, 10:30 AM - 12:00 PM',
  },
  {
    id: 'minis-ninjas',
    title: 'Minis Ninjas',
    subtitle: 'Ages 5-12',
    description: 'An action-packed program where kids build strength, agility, and coordination through ninja-inspired obstacle courses and challenges. Every session is an adventure!',
    icon: Shield,
    color: 'bg-purple-500',
    gradientColor: 'from-purple-400 to-violet-500',
    image: 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_600,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg',
    schedule: 'Saturdays, 11:00 AM - 12:00 PM',
  },
  {
    id: 'learn-to-ride',
    title: 'Learn to Ride',
    subtitle: 'All Ages',
    description: 'Learn to ride a bike in a safe, supportive setting! Whether you are just starting out or building confidence on two wheels, our patient coaches will help you every step of the way.',
    icon: Bike,
    color: 'bg-teal-500',
    gradientColor: 'from-teal-400 to-cyan-500',
    image: '/images/Adaptive bike 1.jpg',
    schedule: 'Sundays, 9:00 AM - 10:30 AM',
  },
  {
    id: 'minis-boxing',
    title: 'Minis Boxing',
    subtitle: 'All Ages',
    description: 'Build strength, confidence, and fitness in a supportive environment. Learn boxing fundamentals and have fun while getting a great workout!',
    icon: Shield,
    color: 'bg-red-500',
    gradientColor: 'from-red-400 to-orange-500',
    image: '/images/Boxing 7.jpg',
    schedule: 'TBA',
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Programs
            </h1>
            <p className="text-xl text-white/90">
              Geelong All-Abilities Sports Club offers a range of programs to meet the needs
              of all of our members, no matter your age or ability. Get active, have fun,
              and build community through sports!
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Find Your Perfect Program
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a range of programs to suit every age and ability. Click on any program to get in touch!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link
                key={program.id}
                to="/contact"
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.gradientColor} opacity-40`} />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-navy">
                      {program.subtitle}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-accent transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 flex-1 leading-relaxed text-sm">
                      {program.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} className="text-accent" />
                      <span>{program.schedule}</span>
                    </div>
                    <div className="mt-3 flex items-center text-accent font-semibold group-hover:text-accent-dark">
                      Join This Program <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Ready to Join the Stars?
            </h2>
            <p className="text-xl text-navy/80 mb-8 max-w-2xl mx-auto">
              We'd love to welcome you to our community! Get in touch to learn more,
              arrange a visit, or sign up for a program. Everyone is welcome!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-navy text-white hover:bg-navy-600" rightIcon={<ArrowRight size={20} />}>
                  Contact Us Today
                </Button>
              </Link>
              <Link to="/our-club">
                <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
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
