import { Image as ImageIcon } from 'lucide-react';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const GALLERY_IMAGES = [
  // Basketball
  { id: 1, url: '/images/basketball minis 1.jpg', name: "Mini's Basketball" },
  { id: 2, url: '/images/Basketball 1.jpg', name: 'Basketball' },
  // Football
  { id: 3, url: '/images/Football 1.jpg', name: 'Youth Football' },
  { id: 4, url: '/images/Football 2.jpg', name: 'Youth Football' },
  { id: 5, url: '/images/Football 3.jpg', name: 'Youth Football' },
  // Golf
  { id: 6, url: '/images/Golf 1.jpg', name: "Mini's Golf" },
  { id: 7, url: '/images/Golf 2.jpg', name: "Mini's Golf" },
  { id: 8, url: '/images/Golf 3.jpg', name: "Mini's Golf" },
  { id: 9, url: '/images/Golf 4.jpg', name: "Mini's Golf" },
  { id: 10, url: '/images/Golf 5.jpg', name: "Mini's Golf" },
  { id: 11, url: '/images/Golf 6.jpg', name: "Mini's Golf" },
  // Golf Open
  { id: 12, url: '/images/Golf Open 1.jpg', name: 'Golf Open' },
  { id: 13, url: '/images/Golf Open 2.jpg', name: 'Golf Open' },
  { id: 14, url: '/images/Golf Open 3.jpg', name: 'Golf Open' },
  { id: 15, url: '/images/Golf Open 4.jpg', name: 'Golf Open' },
  { id: 16, url: '/images/Golf Open 5.jpg', name: 'Golf Open' },
  { id: 17, url: '/images/Golf Open 6.jpg', name: 'Golf Open' },
  { id: 18, url: '/images/Golf Open 7.jpg', name: 'Golf Open' },
  { id: 19, url: '/images/Golf Open 8.jpg', name: 'Golf Open' },
  // Adaptive Bike
  { id: 20, url: '/images/Adaptive bike 1.jpg', name: 'Adaptive Bike' },
  { id: 21, url: '/images/Adaptive bike 2.jpg', name: 'Adaptive Bike' },
  // Running/Walking Group
  { id: 22, url: '/images/Run & walk club 1.jpg', name: 'Running/Walking Group' },
  { id: 23, url: '/images/run & walk club 2.jpg', name: 'Running/Walking Group' },
  // Boxing
  { id: 24, url: '/images/boxing 1.jpg', name: 'Stars Boxing' },
  // Cricket
  { id: 25, url: '/images/Cricket 1.jpg', name: 'Cricket' },
  { id: 26, url: '/images/Cricket 2.jpg', name: 'Cricket' },
  { id: 27, url: '/images/Cricket 3.jpg', name: 'Cricket' },
  { id: 28, url: '/images/Cricket 4.jpg', name: 'Cricket' },
  { id: 29, url: '/images/Cricket 5.jpg', name: 'Cricket' },
  { id: 30, url: '/images/Cricket 6.jpg', name: 'Cricket' },
  { id: 31, url: '/images/Cricket 7.jpg', name: 'Cricket' },
  { id: 32, url: '/images/Cricket 8.jpg', name: 'Cricket' },
  { id: 33, url: '/images/Cricket 9.jpg', name: 'Cricket' },
  { id: 34, url: '/images/Cricket 10.jpg', name: 'Cricket' },
  { id: 35, url: '/images/Cricket 11.jpg', name: 'Cricket' },
  { id: 36, url: '/images/Cricket 12.jpg', name: 'Cricket' },
  { id: 37, url: '/images/Cricket 13.jpg', name: 'Cricket' },
  { id: 38, url: '/images/Cricket 14.jpg', name: 'Cricket' },
  { id: 39, url: '/images/Cricket 15.jpg', name: 'Cricket' },
  { id: 40, url: '/images/Cricket 16.jpg', name: 'Cricket' },
  { id: 41, url: '/images/Cricket 17.jpg', name: 'Cricket' },
  // BMX Day
  { id: 42, url: '/images/BMX Day 1.jpg', name: 'BMX Day' },
  { id: 43, url: '/images/BMX Day 2.jpg', name: 'BMX Day' },
  { id: 44, url: '/images/BMX Day 3.jpg', name: 'BMX Day' },
  { id: 45, url: '/images/BMX Day 4.jpg', name: 'BMX Day' },
  { id: 46, url: '/images/BMX Day 5.jpg', name: 'BMX Day' },
  { id: 47, url: '/images/BMX Day 6.jpg', name: 'BMX Day' },
  { id: 48, url: '/images/BMX Day 7.jpg', name: 'BMX Day' },
  { id: 49, url: '/images/BMX Day 8.jpg', name: 'BMX Day' },
  { id: 50, url: '/images/BMX Day 9.jpg', name: 'BMX Day' },
  { id: 51, url: '/images/BMX Day 10.jpg', name: 'BMX Day' },
  { id: 52, url: '/images/BMX Day 11.jpg', name: 'BMX Day' },
  // Cadel Evans Family Ride
  { id: 53, url: '/images/Cadel Evans Family ride 1.jpg', name: 'Cadel Evans Family Ride' },
  { id: 54, url: '/images/Cadel Family Ride 1.jpg', name: 'Cadel Evans Family Ride' },
  { id: 55, url: '/images/Cadel Family Ride 2.jpg', name: 'Cadel Evans Family Ride' },
  { id: 56, url: '/images/Cadel Family Ride 3.jpg', name: 'Cadel Evans Family Ride' },
  { id: 57, url: '/images/Cadel Family Ride 4.jpg', name: 'Cadel Evans Family Ride' },
  { id: 58, url: '/images/Cadel Family Ride 5.jpg', name: 'Cadel Evans Family Ride' },
  { id: 59, url: '/images/Cadel Family Ride 6.jpg', name: 'Cadel Evans Family Ride' },
  { id: 60, url: '/images/Cadel Family Ride 7.jpg', name: 'Cadel Evans Family Ride' },
  { id: 61, url: '/images/Cadel Family Ride 8.jpg', name: 'Cadel Evans Family Ride' },
  { id: 62, url: '/images/Cadel Family Ride 9.jpg', name: 'Cadel Evans Family Ride' },
  { id: 63, url: '/images/Cadel Family Ride 10.jpg', name: 'Cadel Evans Family Ride' },
  { id: 64, url: '/images/Cadel Family Ride 11.jpg', name: 'Cadel Evans Family Ride' },
  { id: 65, url: '/images/Cadel Family Ride 12.jpg', name: 'Cadel Evans Family Ride' },
  { id: 66, url: '/images/Cadel Family Ride 13.jpg', name: 'Cadel Evans Family Ride' },
  { id: 67, url: '/images/Cadel Family Ride 14.jpg', name: 'Cadel Evans Family Ride' },
  { id: 68, url: '/images/Cadel Family Ride 15.jpg', name: 'Cadel Evans Family Ride' },
  { id: 69, url: '/images/Cadel Family Ride 16.jpg', name: 'Cadel Evans Family Ride' },
  { id: 70, url: '/images/Cadel Famlly Ride 17.jpg', name: 'Cadel Evans Family Ride' },
  // Minis Little Athletics
  { id: 71, url: '/images/Minis Aths 1.jpg', name: 'Minis Little Athletics' },
  { id: 72, url: '/images/Minis Aths 2.jpg', name: 'Minis Little Athletics' },
  { id: 73, url: '/images/Minis Aths 3.jpg', name: 'Minis Little Athletics' },
  { id: 74, url: '/images/Minis Aths 4.jpg', name: 'Minis Little Athletics' },
  { id: 75, url: '/images/Minis Aths 5.jpg', name: 'Minis Little Athletics' },
  { id: 76, url: '/images/Minis Aths 6.jpg', name: 'Minis Little Athletics' },
  { id: 77, url: '/images/Minis Aths 7.jpg', name: 'Minis Little Athletics' },
  { id: 78, url: '/images/Minis Aths 8.jpg', name: 'Minis Little Athletics' },
  { id: 79, url: '/images/Minis Aths 9.jpg', name: 'Minis Little Athletics' },
  { id: 80, url: '/images/Minis Aths 10.jpg', name: 'Minis Little Athletics' },
  { id: 81, url: '/images/Minis Aths 11.jpg', name: 'Minis Little Athletics' },
  { id: 82, url: '/images/Minis Aths 12.jpg', name: 'Minis Little Athletics' },
  { id: 83, url: '/images/Minis Aths 13.jpg', name: 'Minis Little Athletics' },
  { id: 84, url: '/images/Minis Aths 14.jpg', name: 'Minis Little Athletics' },
  { id: 85, url: '/images/Minis Aths 15.jpg', name: 'Minis Little Athletics' },
  { id: 86, url: '/images/Minis Aths 16.jpg', name: 'Minis Little Athletics' },
  { id: 87, url: '/images/Minis Aths 17.jpg', name: 'Minis Little Athletics' },
  { id: 88, url: '/images/Minis Aths 18.jpg', name: 'Minis Little Athletics' },
  { id: 89, url: '/images/Minis Aths 19.jpg', name: 'Minis Little Athletics' },
  { id: 90, url: '/images/Minis Aths 20.jpg', name: 'Minis Little Athletics' },
  { id: 91, url: '/images/Minis Aths 21.jpg', name: 'Minis Little Athletics' },
];

export function PhotoGallery() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Geelong Stars Photo Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl text-white/90">
              Memories from our games, events, and good times together. Everyone's a star here!
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((image) => (
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
        </div>
      </section>
    </>
  );
}

export default PhotoGallery;
