const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarEvent {
  day: number;
  label: string;
  color: string;
  time?: string;
  location?: string;
}

// February 2026 — Victorian / Australian public holidays & special events
const events: CalendarEvent[] = [
  { day: 1, label: 'Running/Walking Group', color: 'bg-pink-500', time: '9:00 AM - 10:00 AM', location: 'Stars HQ, St Albans Reserve' },
  { day: 3, label: 'Youth Football', color: 'bg-blue-500', time: '5:00 PM - 6:30 PM', location: "Stars HQ, St Alban's Reserve" },
  { day: 4, label: 'Minis Golf', color: 'bg-emerald-500', time: '5:15 PM - 6:00 PM', location: 'Curlewis Golf Club' },
  { day: 5, label: 'Stars Meals', color: 'bg-yellow-500', time: '5:00 PM doors open, 6:00 PM meals served', location: 'Stars HQ, St Albans Reserve' },
  { day: 8, label: 'Running/Walking Group', color: 'bg-pink-500', time: '9:00 AM - 10:00 AM', location: 'Stars HQ, St Albans Reserve' },
  { day: 9, label: 'Minis Basketball', color: 'bg-orange-500', time: '5:15 PM - 6:00 PM', location: 'Geelong Stars HQ, St Albans Reserve' },
  { day: 10, label: 'Youth Football', color: 'bg-blue-500', time: '5:00 PM - 6:30 PM', location: "Stars HQ, St Alban's Reserve" },
  { day: 11, label: 'Minis Golf', color: 'bg-emerald-500', time: '5:15 PM - 6:00 PM', location: 'Curlewis Golf Club' },
  { day: 12, label: 'Stars Meals', color: 'bg-yellow-500', time: '5:00 PM doors open, 6:00 PM meals served', location: 'Stars HQ, St Albans Reserve' },
  { day: 15, label: 'Running/Walking Group', color: 'bg-pink-500', time: '9:00 AM - 10:00 AM', location: 'Stars HQ, St Albans Reserve' },
  { day: 16, label: 'Minis Basketball', color: 'bg-orange-500', time: '5:15 PM - 6:00 PM', location: 'Geelong Stars HQ, St Albans Reserve' },
  { day: 17, label: 'Youth Football', color: 'bg-blue-500', time: '5:00 PM - 6:30 PM', location: "Stars HQ, St Alban's Reserve" },
  { day: 18, label: 'Minis Golf', color: 'bg-emerald-500', time: '5:15 PM - 6:00 PM', location: 'Curlewis Golf Club' },
  { day: 19, label: 'Stars Meals', color: 'bg-yellow-500', time: '5:00 PM doors open, 6:00 PM meals served', location: 'Stars HQ, St Albans Reserve' },
  { day: 22, label: 'Running/Walking Group', color: 'bg-pink-500', time: '9:00 AM - 10:00 AM', location: 'Stars HQ, St Albans Reserve' },
  { day: 23, label: 'Minis Basketball', color: 'bg-orange-500', time: '5:15 PM - 6:00 PM', location: 'Geelong Stars HQ, St Albans Reserve' },
  { day: 26, label: 'Stars Meals', color: 'bg-yellow-500', time: '5:00 PM doors open, 6:00 PM meals served', location: 'Stars HQ, St Albans Reserve' },
];

// February 2026 starts on a Sunday, 28 days
const FIRST_DAY = 0; // Sunday = 0
const TOTAL_DAYS = 28;

export function UpcomingEvents() {
  const blanks = Array.from({ length: FIRST_DAY });
  const days = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);

  const getEvents = (day: number) => events.filter((e) => e.day === day);

  return (
    <section className="py-16 lg:py-24 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            What's Happening
          </h2>
          <p className="text-gray-600">
            February 2026 — Public holidays & special events (VIC)
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy to-navy-600 px-4 py-4">
            <h3 className="text-xl font-bold text-white text-center">February 2026</h3>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS.map((d) => (
              <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} className="min-h-[80px] md:min-h-[100px] border-b border-r border-gray-50" />
            ))}
            {days.map((day) => {
              const dayEvents = getEvents(day);
              const isWeekend = (FIRST_DAY + day - 1) % 7 === 0 || (FIRST_DAY + day - 1) % 7 === 6;
              return (
                <div
                  key={day}
                  className={`min-h-[80px] md:min-h-[100px] border-b border-r border-gray-50 p-1.5 md:p-2 ${isWeekend ? 'bg-gray-50/50' : ''}`}
                >
                  <span className={`text-sm font-medium ${isWeekend ? 'text-gray-400' : 'text-navy'}`}>
                    {day}
                  </span>
                  {dayEvents.map((event) => (
                    <div key={event.label} className={`mt-1 ${event.color} text-white text-[10px] md:text-xs font-medium rounded px-1.5 py-0.5 leading-tight`}>
                      {event.label}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Feb 3, 10, 17 — Youth Football · 5:00 PM - 6:30 PM · Stars HQ, St Alban's Reserve</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Feb 4, 11, 18 — Minis Golf · 5:15 PM - 6:00 PM · Curlewis Golf Club</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Feb 9, 16, 23 — Minis Basketball · 5:15 PM - 6:00 PM · Geelong Stars HQ, St Albans Reserve</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Every Thursday — Stars Meals · 5:00 PM doors open, 6:00 PM meals served · Stars HQ, St Albans Reserve</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 rounded-full bg-pink-500" />
            <span>Every Sunday — Running/Walking Group · 9:00 AM - 10:00 AM · Stars HQ, St Albans Reserve</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
