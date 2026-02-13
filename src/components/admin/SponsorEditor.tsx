import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Save, X, Upload } from 'lucide-react';
import { Button, Input, Select, Modal } from '../common';
import { imagesApi } from '../../api';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          description: sponsor.description || '',
          is_active: sponsor.is_active,
        }
      : {
          name: '',
          logo_url: '',
          website_url: '',
          description: '',
          is_active: true,
        },
  });

  const handleClose = () => {
    setSelectedFile(null);
    setPreview(null);
    reset();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = async (data: SponsorFormData) => {
    let logoUrl = data.logo_url;

    // If a new file was selected, upload it first
    if (selectedFile) {
      setUploading(true);
      try {
        const uploadResponse = await imagesApi.upload(selectedFile, {
          name: `sponsor-${data.name.toLowerCase().replace(/\s+/g, '-')}`,
          description: `Logo for ${data.name}`,
          category: 'general',
        });
        if (uploadResponse.success && uploadResponse.data) {
          logoUrl = uploadResponse.data.url;
        } else {
          throw new Error(uploadResponse.error || 'Upload failed');
        }
      } catch (error) {
        console.error('Logo upload failed:', error);
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    await onSave({ ...data, logo_url: logoUrl });
    handleClose();
  };

  const existingLogo = sponsor?.logo_url;
  const showPreview = preview || (!selectedFile && existingLogo);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={sponsor ? 'Edit Sponsor' : 'Add Sponsor'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Sponsor Name"
          placeholder="Enter sponsor name"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        {/* Logo Upload Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo
          </label>
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center
              transition-colors cursor-pointer
              ${showPreview ? 'border-navy bg-navy-50' : 'border-gray-300 hover:border-navy hover:bg-gray-50'}
            `}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {showPreview ? (
              <div className="relative">
                <img
                  src={preview || existingLogo!}
                  alt="Logo preview"
                  className="max-h-36 mx-auto rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={14} />
                </button>
                <p className="text-xs text-gray-500 mt-2">Click or drag to replace</p>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Drag and drop a logo here, or click to select
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, AVIF up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        <Input
          label="Website URL"
          placeholder="https://..."
          {...register('website_url')}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy text-sm"
            rows={3}
            placeholder="Brief description of the sponsor..."
            {...register('description')}
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
          <Button type="submit" isLoading={isLoading || uploading}>
            <Save size={18} className="mr-1" />
            {sponsor ? 'Update Sponsor' : 'Add Sponsor'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default SponsorEditor;
