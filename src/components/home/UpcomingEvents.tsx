export function UpcomingEvents() {
  return (
    <section className="py-16 lg:py-24 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            What's Happening
          </h2>
          <p className="text-gray-600">
            March 2026 — Stars Programs and Special Events
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <img
            src="/images/March events.jpg"
            alt="March 2026 Events Calendar - Geelong Stars Programs and Activities"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
