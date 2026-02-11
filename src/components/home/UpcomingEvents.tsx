import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, PartyPopper } from 'lucide-react';
import { Card, Button, Loading } from '../common';
import { useUpcomingEvents } from '../../hooks';
import type { Event } from '../../types';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card hover padding="none" className="overflow-hidden group">
      <div className="flex">
        <div className="w-20 bg-gradient-to-b from-navy to-navy-600 flex flex-col items-center justify-center py-4 text-white">
          <span className="text-2xl font-bold">
            {new Date(event.date).getDate()}
          </span>
          <span className="text-sm uppercase">
            {new Date(event.date).toLocaleDateString('en-AU', { month: 'short' })}
          </span>
        </div>
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-navy mb-2 group-hover:text-accent transition-colors">{event.title}</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-accent" />
              <span>{formatDate(event.date)}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-accent" />
                <span>{event.time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Sample events for when API is not available
const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Thursday Night Meals 🍽️',
    description: 'Join us for a delicious Thursday night meal with the Geelong Stars community!',
    date: '2025-02-12',
    time: '6:00 PM',
    location: 'Geelong Stars Clubrooms',
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Family Fun Night 🎉',
    description: 'Games, prizes, and fun for the whole family!',
    date: '2024-03-22',
    time: '5:30 PM - 8:00 PM',
    location: 'Main Hall',
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'All-Abilities Sports Day 💪',
    description: 'Celebrate inclusive sports with activities for everyone!',
    date: '2024-03-29',
    time: '9:00 AM - 3:00 PM',
    location: 'Geelong Stars Grounds',
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export function UpcomingEvents() {
  const { data: events, isLoading, error } = useUpcomingEvents(3);

  // Use sample events if no data or error
  const displayEvents = events && events.length > 0 ? events : sampleEvents;

  return (
    <section className="py-16 lg:py-24 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2">
              What's Happening
            </h2>
            <p className="text-gray-600">
              Exciting events and activities for our Stars community. Don't miss out!
            </p>
          </div>
          <Link to="/social" className="mt-4 md:mt-0">
            <Button variant="outline" rightIcon={<ArrowRight size={18} />}>
              See All Events
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <Loading text="Loading events..." />
        ) : error ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {displayEvents.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No upcoming events at the moment. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}

export default UpcomingEvents;
