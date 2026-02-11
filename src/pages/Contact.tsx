import { MapPin, Mail, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/common';
import { ContactForm } from '../components/contact';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

// Google Maps embed URL for 203 St Albans Road, Thomson VIC 3219
const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3140.4!2d144.3697!3d-38.1247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad4155f4c6c7b8f%3A0x0!2s203%20St%20Albans%20Rd%2C%20Thomson%20VIC%203219!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau';

export function Contact() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Contact Geelong Stars"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-white/90">
              Have a question about our programs? Want to come for a visit? Or just want
              to say hello? We're always happy to chat!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-navy">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-500 text-sm">We'll get back to you as soon as we can!</p>
                  </div>
                </div>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card hover>
                <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-navy">Our Location</p>
                      <p className="text-gray-600 text-sm">
                        203 St Albans Road<br />
                        Thomson VIC 3219
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-navy">Email Us</p>
                      <a
                        href="mailto:info@geelongstars.com.au"
                        className="text-gray-600 text-sm hover:text-navy transition-colors"
                      >
                        info@geelongstars.com.au
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card hover>
                <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
                  Follow Us
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay connected and see what we're up to!
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/p/Geelong-All-Abilities-Sports-Club-61563454708703/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center hover:bg-navy hover:text-white transition-colors text-navy"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/geelongstars"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center hover:bg-navy hover:text-white transition-colors text-navy"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-navy to-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Us
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We're located at 203 St Albans Road, Thomson. Pop in during one of our
              program times or get in touch to arrange a visit!
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Geelong Stars Location - 203 St Albans Road, Thomson VIC 3219"
                className="w-full h-full"
              />
            </div>
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Geelong Stars</p>
                    <p className="text-gray-600 text-sm">203 St Albans Road, Thomson VIC 3219</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir//203+St+Albans+Rd,+Thomson+VIC+3219"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button rightIcon={<ArrowRight size={16} />}>
                    Get Directions
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy to-navy-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 left-8 text-4xl opacity-20">💬</div>
            <div className="absolute bottom-4 right-8 text-4xl opacity-20">⭐</div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              We Can't Wait to Meet You! 🌟
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're interested in joining a program, volunteering, or just
              learning more about what we do - we're here to help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/programs">
                <Button size="lg" className="bg-yellow-400 text-navy hover:bg-yellow-300 font-bold" rightIcon={<ArrowRight size={20} />}>
                  Explore Programs
                </Button>
              </Link>
              <Link to="/our-club">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                  Learn About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
