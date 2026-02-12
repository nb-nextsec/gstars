import { Users, Trophy, Heart, Calendar, MapPin, ArrowRight, Zap, Shield, Bike } from 'lucide-react';
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
  // Currently running
  {
    id: 'minis-basketball',
    title: "Mini's Basketball",
    subtitle: 'Ages 5-12',
    description: 'A fun, supportive environment where kids learn basketball fundamentals, teamwork, and sportsmanship. Every child is encouraged to participate and have a blast!',
    icon: Users,
    color: 'bg-orange-500',
    gradientColor: 'from-orange-400 to-pink-500',
    image: '/images/basketball minis 1.jpg',
    schedule: 'Mondays, 5:15 PM - 6:00 PM',
    location: 'Geelong Stars Clubrooms',
    link: 'https://www.cognitoforms.com/GEELONGALLABILITIESSPORTSCLUB/TERM12026MINIBASKETBALL?fbclid=IwY2xjawP59mVleHRuA2FlbQIxMABicmlkETF6Uk80dHNTYnZwM3BWcEFoc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHqjZro-kpp37GhTuvQSoaI_-4PcBO2lOsnTtngZprRoGI20tIE-K41VmUt88_aem_qv7zroye0TEOlpApMFAQ_w',
  },
  {
    id: 'youth-football',
    title: 'Youth Football',
    subtitle: 'Ages 12-18',
    description: 'Our flagship program! Inclusive football designed for participants of all abilities. Get active, have fun, and be part of our welcoming community where everyone belongs!',
    icon: AFLFootballIcon,
    color: 'bg-blue-500',
    gradientColor: 'from-blue-400 to-indigo-500',
    image: '/images/Football 3.jpg',
    schedule: 'Tuesdays 5:00 PM - 6:30 PM',
    location: 'Geelong Stars Clubrooms',
    link: 'https://www.cognitoforms.com/GEELONGALLABILITIESSPORTSCLUB/TERM12026YOUTHFOOTBALL?fbclid=IwY2xjawP5-FJleHRuA2FlbQIxMABicmlkETF6Uk80dHNTYnZwM3BWcEFoc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHjRKfjJyVyJOMGuJ87ysGx9Bmzliv0-ftJd7WXQ3zekq9MvS-zVhINLgUXVb_aem_K6xGLpel_eN2c2Fb8rzYQQ',
  },
  {
    id: 'minis-golf',
    title: "Mini's Golf",
    subtitle: 'Ages 5-12',
    description: 'A fun introduction to golf for young children of all abilities. Learn the basics in a supportive, low-pressure environment where every swing is celebrated!',
    icon: Trophy,
    color: 'bg-green-500',
    gradientColor: 'from-emerald-400 to-green-500',
    image: '/images/Golf 1.jpg',
    schedule: 'Wednesdays 5:15 PM - 6:00 PM',
    location: 'Curlewis Golf Club',
    link: 'https://www.cognitoforms.com/GEELONGALLABILITIESSPORTSCLUB/TERM12026MINISGOLF?fbclid=IwY2xjawP596ZleHRuA2FlbQIxMABicmlkETF6Uk80dHNTYnZwM3BWcEFoc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHljwinRmQT7u9xlVFPIbYG2T7fKvpuvB2JP6VvOQMWvQo40uw59VQ8iU7gxE_aem_y-2bBcUnjXfOzUxSWB7GMQ',
  },
  {
    id: 'running-walking-group',
    title: 'Running/Walking Group',
    subtitle: 'All Ages',
    description: <>Lace up and join us for a friendly, inclusive, guided walk or run around a 1km track! Geelong All-Abilities Sports Club and Achilles International Geelong have partnered together to bring a new running and walking group option every Sunday morning. Our mission is to make running and walking more accessible to people with disabilities, and we welcome new members and participants to come down and join in! For more details, contact: <a href="mailto:geelongachillesaustralia@gmail.com" className="underline text-accent hover:text-accent-dark" onClick={(e) => e.stopPropagation()}>geelongachillesaustralia@gmail.com</a></>,
    icon: Heart,
    color: 'bg-pink-500',
    gradientColor: 'from-pink-400 to-rose-500',
    image: '/images/Run & walk club 1.jpg',
    schedule: 'Every Sunday, 9 AM - 10:00 AM',
    location: 'Stars HQ, St Albans Reserve',
  },
  // Beginning Feb
  {
    id: 'learn-to-ride',
    title: 'Learn to Ride',
    subtitle: 'All Ages',
    description: 'A fun and inclusive program for people of all ages and abilities to experience the joy of riding! The program is about riding with no expectations and most importantly having fun. The Geelong Stars has a range of trikes, bikes with stabilisers and BMX bikes for all levels, or members are welcome to bring their own. If you have a bike and helmet bring it along and join in!',
    icon: Bike,
    color: 'bg-teal-500',
    gradientColor: 'from-teal-400 to-cyan-500',
    image: '/images/Adaptive bike 1.jpg',
    schedule: 'Sunday 15th Feb, 10:00 AM - 11:00 AM',
    location: 'Stars HQ, St Albans Reserve',
    link: 'https://www.cognitoforms.com/GEELONGALLABILITIESSPORTSCLUB/GEELONGALLABILITIESLEARNTORIDEDAY?fbclid=IwY2xjawP59Y5leHRuA2FlbQIxMABicmlkETF6Uk80dHNTYnZwM3BWcEFoc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHsJobcd0KK8FwA9IumgYaW0pLpGOXQbQlLem1ebRN6ltQOdfvVwwtp7Qlbzq_aem_vvKYASu-nduoEFx3EmeQKg',
  },
  {
    id: 'youth-golf',
    title: 'Youth Golf',
    subtitle: 'Ages 12-18',
    description: 'Come and join Geelong Stars FREE All-Abilities Golf Program proudly supported by our friends at McHarrys Buslines. The 3 week program for children 12 - 18 with disabilities, is a great introduction into golf with fun activities and qualified coaches. Build on your golfing skills in a fun, inclusive setting!',
    icon: Trophy,
    color: 'bg-lime-500',
    gradientColor: 'from-lime-400 to-green-500',
    image: '/images/Golf Open 7.jpg',
    schedule: 'Tuesdays 5:00 PM - 6:30 PM beginning Feb 24th',
    location: 'Curlewis Golf Club',
    link: 'https://www.cognitoforms.com/GEELONGALLABILITIESSPORTSCLUB/TERM12026YOUTHGOLF?fbclid=IwY2xjawP58-tleHRuA2FlbQIxMABicmlkETF6Uk80dHNTYnZwM3BWcEFoc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHsJobcd0KK8FwA9IumgYaW0pLpGOXQbQlLem1ebRN6ltQOdfvVwwtp7Qlbzq_aem_vvKYASu-nduoEFx3EmeQKg',
  },
  // Beginning March
  {
    id: 'minis-cricket',
    title: 'Minis Cricket',
    subtitle: 'Ages 5-12',
    description: 'A fantastic introduction to cricket for young stars! Kids develop hand-eye coordination, teamwork, and confidence through fun cricket activities in a supportive, inclusive environment.',
    icon: Trophy,
    color: 'bg-sky-500',
    gradientColor: 'from-sky-400 to-blue-500',
    image: '/images/Cricket 1.jpg',
    schedule: 'Wednesdays 5:15 PM - 6PM beginning March 4th',
    location: 'Geelong Stars Clubrooms',
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
    schedule: 'Mondays beginning March 16th',
    location: 'Geelong Stars Clubrooms',
  },
  {
    id: 'youth-basketball',
    title: 'Youth Basketball',
    subtitle: 'Ages 12-18',
    description: 'A welcoming basketball program for young people of all abilities! Have fun, make friends, and build confidence on the court. No experience needed — just bring your energy and we will bring the good times!',
    icon: Users,
    color: 'bg-amber-500',
    gradientColor: 'from-amber-400 to-orange-500',
    image: '/images/Basketball 1.jpg',
    schedule: 'Tuesdays beginning March 17th',
    location: 'Geelong Stars Clubrooms',
  },
  // TBA
  {
    id: 'minis-little-athletics',
    title: 'Minis Little Athletics',
    subtitle: 'Ages 5-12',
    description: 'An exciting introduction to athletics for young stars! Kids develop coordination, speed, and confidence through fun track and field activities in a supportive, inclusive environment.',
    icon: Zap,
    color: 'bg-yellow-500',
    gradientColor: 'from-yellow-400 to-amber-500',
    image: '/images/Minis Aths 10.jpg',
    schedule: 'TBA',
    location: 'TBA',
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
    schedule: 'TBA',
    location: 'TBA',
  },
  {
    id: 'minis-boxing',
    title: 'Minis Boxing',
    subtitle: 'Ages 5-12',
    description: 'Build strength, confidence, and fitness in a supportive environment. Learn boxing fundamentals and have fun while getting a great workout!',
    icon: Shield,
    color: 'bg-red-500',
    gradientColor: 'from-red-400 to-orange-500',
    image: '/images/boxing 7.jpg',
    schedule: 'TBA',
    location: 'TBA',
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
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const card = (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
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
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={14} className="text-accent" />
                      <span>{program.location}</span>
                    </div>
                    <div className="mt-3 flex items-center text-accent font-semibold group-hover:text-accent-dark">
                      Join This Program <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );

              return program.link ? (
                <a
                  key={program.id}
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  {card}
                </a>
              ) : (
                <Link
                  key={program.id}
                  to="/contact"
                  className="group"
                >
                  {card}
                </Link>
              );
            })}
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
              <Link to="/membership">
                <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  Sign Up
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
