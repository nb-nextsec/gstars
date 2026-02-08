import { useForm } from 'react-hook-form';
import { Save, X } from 'lucide-react';
import { Button, Input, Select, Modal } from '../common';
import type { Sponsor, SponsorFormData } from '../../types';

interface SponsorEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SponsorFormData) => Promise<void>;
  sponsor?: Sponsor | null;
  isLoading?: boolean;
}

export function SponsorEditor({
  isOpen,
  onClose,
  onSave,
  sponsor,
  isLoading = false,
}: SponsorEditorProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SponsorFormData>({
    defaultValues: sponsor
      ? {
          name: sponsor.name,
          logo_url: sponsor.logo_url || '',
          website_url: sponsor.website_url || '',
          tier: sponsor.tier,
          display_order: sponsor.display_order,
          is_active: sponsor.is_active,
        }
      : {
          name: '',
          logo_url: '',
          website_url: '',
          tier: 'bronze',
          display_order: 0,
          is_active: true,
        },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: SponsorFormData) => {
    await onSave(data);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={sponsor ? 'Edit Sponsor' : 'Add Sponsor'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Sponsor Name"
          placeholder="Enter sponsor name"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        <Input
          label="Logo URL"
          placeholder="https://..."
          helperText="URL to the sponsor's logo image"
          {...register('logo_url')}
        />

        <Input
          label="Website URL"
          placeholder="https://..."
          {...register('website_url')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Tier"
            options={[
              { value: 'gold', label: 'Gold' },
              { value: 'silver', label: 'Silver' },
              { value: 'bronze', label: 'Bronze' },
            ]}
            {...register('tier')}
          />

          <Input
            label="Display Order"
            type="number"
            placeholder="0"
            {...register('display_order', { valueAsNumber: true })}
          />
        </div>

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
            {sponsor ? 'Update Sponsor' : 'Add Sponsor'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default SponsorEditor;
