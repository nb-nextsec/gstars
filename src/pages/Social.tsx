import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { UpcomingEvents } from '../components/home/UpcomingEvents';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

export function Social() {

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Geelong Stars News and Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              News and Events
            </h1>
            <p className="text-xl text-white/90">
              Stay connected with the Geelong Stars community! Check out our upcoming
              events, browse photos, and see what fun we've been having together.
            </p>
          </div>
        </div>
      </section>

      {/* Stars News */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Stars News
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The latest updates and news from Geelong Stars!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="https://timesnewsgroup.com.au/geelongtimes/news/stars-launch-an-innovative-bmx-program/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://static.timesnewsgroup.com.au/prod/uploads/sites/21/2025/10/Untitled-design-30-2.jpg"
                  alt="Stars launch an innovative BMX program"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-cyan-600 font-semibold mb-2">In The News!</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Stars Launch an Innovative BMX Program
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Geelong Stars is launching an all-abilities BMX program with adaptive bikes
                  and inclusive riding opportunities. More than 20 participants have already
                  engaged with our Learn to Ride programs. Read more in the Geelong Times!
                </p>
              </div>
            </a>

            <a
              href="https://timesnewsgroup.com.au/geelongtimes/news/supporting-active-initiatives/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://static.timesnewsgroup.com.au/prod/uploads/sites/21/2025/09/Cr-Melissa-Cadwell.jpg"
                  alt="Supporting active initiatives"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-cyan-600 font-semibold mb-2">In The News!</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Supporting Active Initiatives
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Geelong's community sports initiatives including all-abilities sporting
                  activities and inclusive programs encouraging broader participation in
                  local sports and recreation. Read more in the Geelong Times!
                </p>
              </div>
            </a>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/Cadel Family Ride 2.jpg"
                  alt="Geelong Stars Represented at the Cadel Evans Family Ride"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-cyan-600 font-semibold mb-2">Community</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Geelong Stars Represented at the Cadel Evans Family Ride
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Geelong Stars proudly participated in the Cadel Evans Great Ocean Road Race
                  Family Ride, showcasing our commitment to inclusive cycling and community
                  engagement in one of Geelong's biggest sporting events!
                </p>
              </div>
            </div>

            <a
              href="https://timesnewsgroup.com.au/geelongtimes/news/new-all-abilities-sports-club-to-launch-in-geelong/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://static.timesnewsgroup.com.au/prod/uploads/sites/21/2024/10/Your-paragraph-text-2024-10-03T102342.640.png"
                  alt="New all-abilities sports club to launch in Geelong"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-cyan-600 font-semibold mb-2">In The News!</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  New All-Abilities Sports Club to Launch in Geelong
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Geelong Stars is launching an inclusive sports program for children with
                  diverse abilities, providing accessible athletic activities and community
                  engagement. Read more in the Geelong Times!
                </p>
              </div>
            </a>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/Football 1.jpg"
                  alt="New Season Registration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-green-600 font-semibold mb-2">Exciting News!</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  New Season Registration Open!
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Registration for the new season is now open! Head to our programs
                  page to learn more about our offerings and join the fun. All ages and
                  abilities welcome.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/Basketball 1.jpg"
                  alt="New Members Welcome"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">Welcome!</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  New Members Welcome
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We're always welcoming new members to our Geelong Stars family!
                  Come along to a session and see what we're all about. No experience
                  needed - just bring yourself and a smile.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/Golf 1.jpg"
                  alt="Our Amazing Volunteers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-pink-600 font-semibold mb-2">Thank You!</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Our Amazing Volunteers
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A big shoutout to all our incredible volunteers who make Geelong Stars
                  possible. Your time and dedication helps our athletes thrive every
                  single week. You're all superstars!
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/Adaptive bike 1.jpg"
                  alt="Learn to Ride Program Launch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-teal-600 font-semibold mb-2">New Program!</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Learn to Ride Program Launch
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our brand new Learn to Ride program is up and running! Participants of
                  all ages and abilities are building confidence on two wheels with our
                  supportive coaches. Bikes and helmets provided.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/Run & walk club 1.jpg"
                  alt="Running & Walking Group Growing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-orange-600 font-semibold mb-2">Community</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Running & Walking Group Growing
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Sunday morning Running & Walking Group continues to grow! Whether
                  you prefer a brisk walk or a jog, everyone is welcome. It's a great
                  way to stay active and meet new friends.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/Golf 2.jpg"
                  alt="Golf Program Highlights"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-emerald-600 font-semibold mb-2">Highlights</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Golf Stars Shine on the Course
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our golfers have been putting in the work and it shows! Check out
                  what our Mini's Golf crew have been up to on the course. Skills are
                  improving every week.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/boxing 1.jpg"
                  alt="Stars Boxing in Action"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-red-600 font-semibold mb-2">Program Update</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Stars Boxing in Action
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Stars Boxing program is a hit! Participants are building strength,
                  confidence, and fitness while having a blast. Come along and see what
                  all the excitement is about.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/Football 2.jpg"
                  alt="Thursday Night Meals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-purple-600 font-semibold mb-2">Social</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Thursday Night Meals a Hit
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Thursday Night Meals are bringing the community together every week!
                  Great food, great company, and great vibes. Everyone is welcome to join
                  us for dinner at the clubrooms.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/basketball minis 1.jpg"
                  alt="Sponsor Spotlight"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-amber-600 font-semibold mb-2">Sponsors</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Thank You to Our Sponsors
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A huge thank you to all our amazing sponsors who make our programs
                  possible. Your generous support helps us provide inclusive sport for
                  everyone in the Geelong community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Happening — shared with Home page */}
      <UpcomingEvents />

      {/* Social Media */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-navy to-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Follow Us!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Stay connected with us on social media for the latest updates,
            photos, and all the fun from our community!
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://www.facebook.com/p/Geelong-All-Abilities-Sports-Club-61563454708703/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all text-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/geelongstars"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all text-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
          <p className="text-white/70 text-sm">
            Tag us in your photos! #GeelongStars #AllAbilitiesSports
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 left-8 text-4xl opacity-20">🎉</div>
            <div className="absolute bottom-4 right-8 text-4xl opacity-20">⭐</div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Want to Join the Fun? 🌟
            </h2>
            <p className="text-xl text-navy/80 mb-8 max-w-2xl mx-auto">
              There's always something happening at Geelong Stars! Get in touch to
              find out more about joining our community.
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Social;
