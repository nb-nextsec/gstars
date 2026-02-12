import { Star, Users, Award, Heart, Accessibility, ArrowRight, HeartHandshake, Target, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/common';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';
const TEAM_IMAGE = 'https://static.wixstatic.com/media/c23ea9_6f77b1dc166242098bc394d398c3deb2~mv2.jpg/v1/fill/w_800,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Youth%20Basketball_edited.jpg';

const values = [
  {
    icon: Accessibility,
    title: 'All Abilities Welcome',
    description: 'Programs designed for participants of every ability level. Everyone belongs here!',
    color: 'bg-blue-500',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Building friendships and connections that last a lifetime.',
    color: 'bg-green-500',
  },
  {
    icon: Heart,
    title: 'Fun & Friendship',
    description: 'We believe sport should be enjoyable for everyone. Fun comes first!',
    color: 'bg-pink-500',
  },
  {
    icon: Star,
    title: 'Everyone is a Star',
    description: 'Every participant is valued, celebrated, and encouraged to shine.',
    color: 'bg-yellow-500',
  },
];

const whyJoin = [
  {
    icon: HeartHandshake,
    title: 'Supportive Environment',
    description: 'Trained coaches and volunteers who understand and celebrate all abilities.',
  },
  {
    icon: Smile,
    title: 'Welcoming Community',
    description: 'Make friends, have fun, and be part of something special.',
  },
  {
    icon: Target,
    title: 'Skill Development',
    description: 'Develop skills at your own pace with highly adaptive programs.',
  },
  {
    icon: Award,
    title: 'Celebrate Success',
    description: 'Every achievement is celebrated, no matter how big or small.',
  },
];

export function OurClub() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Geelong Stars Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Geelong Stars
            </h1>
            <p className="text-xl text-white/90">
              We're more than just a sports club - we're a community where everyone
              belongs, everyone plays, and everyone shines!
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Where Everyone Gets to Play!
              </h2>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  <strong className="text-navy">Geelong All-Abilities Sports Club</strong> offers
                  a range of programs to meet the needs of all of our members, no matter your
                  age or ability.
                </p>
                <p>
                  At Geelong Stars, everyone is encouraged to get active, have fun, and build
                  community through sports! We believe that sport has the power to bring people
                  together, build confidence, and create lasting friendships.
                </p>
                <p>
                  No matter your age, ability, or experience level — everyone is welcome at
                  Geelong Stars. Whether you're here to try something new, build confidence,
                  make friends, or just have fun, there's a place for you here. Come join our family!
                </p>
              </div>

              <div className="mt-8">
                <Link to="/programs">
                  <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                    Explore Our Programs
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={TEAM_IMAGE}
                  alt="Geelong Stars players"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0">
          <img
            src={TEAM_IMAGE}
            alt="Geelong Stars values"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Makes Us Unique
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Our core values guide everything we do - creating a welcoming space for all!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Why Join Geelong Stars?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's why our members love being part of our community!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyJoin.map((item) => (
              <div key={item.title} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-navy to-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Creating Opportunities for Everyone
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Our mission is to promote physical activity, social inclusion, and personal
              development through a diverse range of sports and recreational activities.
              We believe that everyone deserves the opportunity to participate in sports,
              regardless of their physical or cognitive abilities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 left-8 text-4xl opacity-20">⭐</div>
            <div className="absolute bottom-4 right-8 text-4xl opacity-20">🌟</div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Ready to Join the Stars? 🌟
            </h2>
            <p className="text-xl text-navy/80 mb-8 max-w-2xl mx-auto">
              We'd love to welcome you to our community! Get in touch to learn more,
              arrange a visit, or sign up for a program. Everyone is welcome!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-navy text-white hover:bg-navy-600" rightIcon={<ArrowRight size={20} />}>
                  Get In Touch
                </Button>
              </Link>
              <Link to="/programs">
                <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  View Programs
                </Button>
              </Link>
              <Link to="/membership">
                <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  Become a Member
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurClub;
