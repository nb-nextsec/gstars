import { Calendar, Image as ImageIcon, Camera, PartyPopper, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Loading, Button } from '../components/common';
import { EventCard } from '../components/events';
import { useEvents, useImages } from '../hooks';
import type { Event } from '../types';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

// Gallery images from geelongstars.com.au
const GALLERY_IMAGES = [
  {
    id: 1,
    url: 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg',
    name: 'Team Training',
    description: 'Basketball training session',
  },
  {
    id: 2,
    url: 'https://static.wixstatic.com/media/c23ea9_6f77b1dc166242098bc394d398c3deb2~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Youth%20Basketball_edited.jpg',
    name: 'Youth Basketball',
    description: 'Junior players in action',
  },
  {
    id: 3,
    url: 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg',
    name: 'Community Fun',
    description: 'Having fun together',
  },
  {
    id: 4,
    url: 'https://static.wixstatic.com/media/c23ea9_6f77b1dc166242098bc394d398c3deb2~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Youth%20Basketball_edited.jpg',
    name: 'Game Day',
    description: 'Competition day',
  },
  {
    id: 5,
    url: 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg',
    name: 'Team Spirit',
    description: 'Our amazing community',
  },
  {
    id: 6,
    url: 'https://static.wixstatic.com/media/c23ea9_6f77b1dc166242098bc394d398c3deb2~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Youth%20Basketball_edited.jpg',
    name: 'All Abilities Sports',
    description: 'Everyone plays together',
  },
  {
    id: 7,
    url: 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg',
    name: 'Skills Development',
    description: 'Learning and growing',
  },
  {
    id: 8,
    url: 'https://static.wixstatic.com/media/c23ea9_6f77b1dc166242098bc394d398c3deb2~mv2.jpg/v1/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Youth%20Basketball_edited.jpg',
    name: 'Celebration',
    description: 'Celebrating success',
  },
];

// Sample events for when API is not available
const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Family Fun Day! 🎉',
    description: 'Join us for a day of fun, games, BBQ, and activities for the whole family! Everyone is welcome - bring your friends and family for a great day out.',
    date: '2024-03-15',
    time: '10:00 AM - 3:00 PM',
    location: 'Geelong Stars Clubrooms',
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Come & Try Day',
    description: 'New to Geelong Stars? Come along and try any of our programs for free! Meet our coaches and fellow players. No experience needed!',
    date: '2024-03-20',
    time: '9:00 AM - 12:00 PM',
    location: 'Main Court',
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'End of Season Celebration',
    description: 'Let\'s celebrate an amazing season together! Awards, food, music, and lots of fun. All members and families welcome.',
    date: '2024-04-25',
    time: '5:00 PM - 8:00 PM',
    location: 'Function Room',
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Community BBQ',
    description: 'Monthly community BBQ - a great chance to catch up with friends, meet new people, and enjoy some delicious food together!',
    date: '2024-04-05',
    time: '12:00 PM - 2:00 PM',
    location: 'Outdoor Area',
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export function Social() {
  const { data: events, isLoading: eventsLoading } = useEvents(true);
  const { data: galleryImages, isLoading: imagesLoading } = useImages('gallery');

  const displayEvents = events && events.length > 0 ? events : sampleEvents;
  const displayGallery = galleryImages && galleryImages.length > 0
    ? galleryImages
    : GALLERY_IMAGES.map(img => ({ ...img, category: 'gallery', created_at: '' }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Geelong Stars Social Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <PartyPopper className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Fun Times Ahead!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Social & Events 🎉
            </h1>
            <p className="text-xl text-white/90">
              Stay connected with the Geelong Stars community! Check out our upcoming
              events, browse photos, and see what fun we've been having together.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-navy/10 rounded-full px-4 py-2 mb-4">
                <Calendar className="w-4 h-4 text-navy" />
                <span className="text-navy text-sm font-semibold">Mark Your Calendar!</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600">
                Don't miss out on the fun - here's what's coming up!
              </p>
            </div>
          </div>

          {eventsLoading ? (
            <Loading text="Loading events..." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayEvents.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {displayEvents.length === 0 && !eventsLoading && (
            <div className="text-center py-12 bg-gray-bg rounded-xl">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Upcoming Events
              </h3>
              <p className="text-gray-500">
                Check back soon for new events!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 lg:py-24 bg-gray-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
              <Camera className="w-4 h-4 text-pink-500" />
              <span className="text-navy text-sm font-semibold">Snapshots!</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Photo Gallery 📸
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Memories from our games, events, and good times together. Everyone's a star here!
            </p>
          </div>

          {imagesLoading ? (
            <Loading text="Loading gallery..." />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayGallery.map((image) => (
                <div
                  key={image.id}
                  className="group aspect-square bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {image.url ? (
                    <div className="relative w-full h-full">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-medium text-sm">{image.name}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-navy-50">
                      <ImageIcon className="w-8 h-8 text-navy-200 mb-2" />
                      <span className="text-sm text-navy-400 text-center px-2">
                        {image.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community News */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-navy/10 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-navy text-sm font-semibold">What's New?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Community News
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The latest updates and news from Geelong Stars!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card hover className="border-l-4 border-l-green-500">
              <div className="text-sm text-green-600 font-semibold mb-2">Exciting News!</div>
              <h3 className="text-lg font-semibold text-navy mb-2">
                New Season Registration Open! 🎉
              </h3>
              <p className="text-gray-600 text-sm">
                Registration for the new season is now open! Head to our programs
                page to learn more about our offerings and join the fun.
              </p>
            </Card>

            <Card hover className="border-l-4 border-l-blue-500">
              <div className="text-sm text-blue-600 font-semibold mb-2">Welcome!</div>
              <h3 className="text-lg font-semibold text-navy mb-2">
                New Members Welcome 💪
              </h3>
              <p className="text-gray-600 text-sm">
                We're always welcoming new members to our Geelong Stars family!
                Come along to a session and see what we're all about.
              </p>
            </Card>

            <Card hover className="border-l-4 border-l-pink-500">
              <div className="text-sm text-pink-600 font-semibold mb-2">Thank You!</div>
              <h3 className="text-lg font-semibold text-navy mb-2">
                Our Amazing Volunteers ❤️
              </h3>
              <p className="text-gray-600 text-sm">
                A big shoutout to all our incredible volunteers who make Geelong Stars
                possible. You're all superstars!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-navy to-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Follow Us! 📱
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
