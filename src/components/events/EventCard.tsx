import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card } from '../common';
import type { Event } from '../../types';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact';
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function EventCard({ event, variant = 'default' }: EventCardProps) {
  if (variant === 'compact') {
    return (
      <Card hover padding="none" className="overflow-hidden">
        <div className="flex">
          <div className="w-20 bg-navy flex flex-col items-center justify-center py-4 text-white">
            <span className="text-2xl font-bold">
              {new Date(event.date).getDate()}
            </span>
            <span className="text-sm uppercase">
              {new Date(event.date).toLocaleDateString('en-AU', { month: 'short' })}
            </span>
          </div>
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-navy mb-1">{event.title}</h3>
            {event.time && (
              <p className="text-sm text-gray-600">{event.time}</p>
            )}
            {event.location && (
              <p className="text-sm text-gray-500">{event.location}</p>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card hover className="h-full flex flex-col">
      {event.image_url && (
        <div className="relative -mx-6 -mt-6 mb-4">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-navy rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
          <span className="text-lg font-bold leading-none">
            {new Date(event.date).getDate()}
          </span>
          <span className="text-xs uppercase">
            {new Date(event.date).toLocaleDateString('en-AU', { month: 'short' })}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-navy">{event.title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <Calendar size={14} />
            <span>{formatDate(event.date)}</span>
          </div>
        </div>
      </div>

      {event.description && (
        <p className="text-gray-600 mb-4 flex-1">{event.description}</p>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        {event.time && (
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span>{event.time}</span>
          </div>
        )}
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>{event.location}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export default EventCard;
