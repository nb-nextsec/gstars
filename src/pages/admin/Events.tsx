import { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import { Card, Button, Loading, ConfirmModal } from '../../components/common';
import { EventEditor } from '../../components/admin';
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks';
import type { Event, EventFormData } from '../../types';

export function Events() {
  const { data: events, isLoading, error } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);

  const handleCreate = () => {
    setEditingEvent(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsEditorOpen(true);
  };

  const handleSave = async (data: EventFormData) => {
    if (editingEvent) {
      await updateEvent.mutateAsync({ id: editingEvent.id, data });
    } else {
      await createEvent.mutateAsync(data);
    }
  };

  const handleDelete = async () => {
    if (deletingEvent) {
      await deleteEvent.mutateAsync(deletingEvent.id);
      setDeletingEvent(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-AU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Events</h1>
          <p className="text-gray-600">Manage club events and activities.</p>
        </div>
        <Button onClick={handleCreate} leftIcon={<Plus size={18} />}>
          Add Event
        </Button>
      </div>

      {/* Events List */}
      {isLoading ? (
        <Loading text="Loading events..." />
      ) : error ? (
        <Card className="text-center py-8">
          <p className="text-red-600">Error loading events. Please try again.</p>
        </Card>
      ) : events && events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-navy rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                  <span className="text-xl font-bold leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="text-xs uppercase">
                    {new Date(event.date).toLocaleDateString('en-AU', { month: 'short' })}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy truncate">{event.title}</h3>
                    {!event.is_active && (
                      <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(event.date)}
                    </span>
                    {event.time && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.time}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 md:flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(event)}
                  leftIcon={<Edit2 size={16} />}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeletingEvent(event)}
                  className="text-red-600 hover:bg-red-50"
                  leftIcon={<Trash2 size={16} />}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Events Yet</h3>
          <p className="text-gray-500 mb-4">Create your first event to get started.</p>
          <Button onClick={handleCreate} leftIcon={<Plus size={18} />}>
            Add Event
          </Button>
        </Card>
      )}

      {/* Event Editor Modal */}
      <EventEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
        event={editingEvent}
        isLoading={createEvent.isPending || updateEvent.isPending}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${deletingEvent?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        isLoading={deleteEvent.isPending}
      />
    </div>
  );
}

export default Events;
