import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button, Input, Select, Modal } from '../common';
import type { ImageFormData } from '../../types';

interface ImageUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, data: ImageFormData) => Promise<void>;
  isLoading?: boolean;
}

const categoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'hero', label: 'Hero Images' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'programs', label: 'Programs' },
  { value: 'social', label: 'Social' },
];

export function ImageUploader({
  isOpen,
  onClose,
  onUpload,
  isLoading = false,
}: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ImageFormData>({
    defaultValues: {
      name: '',
      description: '',
      category: 'general',
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

  const onSubmit = async (data: ImageFormData) => {
    if (!selectedFile) return;
    await onUpload(selectedFile, data);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload Image"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* File Upload Area */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center
            transition-colors cursor-pointer
            ${preview ? 'border-navy bg-navy-50' : 'border-gray-300 hover:border-navy hover:bg-gray-50'}
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

          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-1">
                Drag and drop an image here, or click to select
              </p>
              <p className="text-sm text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
        </div>

        <Input
          label="Image Name"
          placeholder="Enter a name for this image"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        <Input
          label="Description (Optional)"
          placeholder="Brief description of the image"
          {...register('description')}
        />

        <Select
          label="Category"
          options={categoryOptions}
          {...register('category')}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!selectedFile}
          >
            <ImageIcon size={18} className="mr-1" />
            Upload Image
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ImageUploader;
