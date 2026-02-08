import { useForm } from 'react-hook-form';
import { Save, X } from 'lucide-react';
import { Button, Input, Textarea, Select, Modal } from '../common';
import type { Event, EventFormData } from '../../types';

interface EventEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EventFormData) => Promise<void>;
  event?: Event | null;
  isLoading?: boolean;
}

export function EventEditor({
  isOpen,
  onClose,
  onSave,
  event,
  isLoading = false,
}: EventEditorProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: event
      ? {
          title: event.title,
          description: event.description || '',
          date: event.date,
          time: event.time || '',
          location: event.location || '',
          image_url: event.image_url || '',
          is_active: event.is_active,
        }
      : {
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          image_url: '',
          is_active: true,
        },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: EventFormData) => {
    await onSave(data);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={event ? 'Edit Event' : 'Create Event'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Event Title"
          placeholder="Enter event title"
          error={errors.title?.message}
          {...register('title', { required: 'Title is required' })}
        />

        <Textarea
          label="Description"
          placeholder="Enter event description"
          rows={3}
          {...register('description')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            error={errors.date?.message}
            {...register('date', { required: 'Date is required' })}
          />

          <Input
            label="Time"
            placeholder="e.g., 9:00 AM - 5:00 PM"
            {...register('time')}
          />
        </div>

        <Input
          label="Location"
          placeholder="Enter event location"
          {...register('location')}
        />

        <Input
          label="Image URL"
          placeholder="https://..."
          {...register('image_url')}
        />

        <Select
          label="Status"
          options={[
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Inactive' },
          ]}
          {...register('is_active')}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="ghost" onClick={handleClose}>
            <X size={18} className="mr-1" />
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            <Save size={18} className="mr-1" />
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EventEditor;
