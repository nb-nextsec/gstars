import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, ExternalLink, FolderOpen } from 'lucide-react';
import { Card, Button, Loading, ConfirmModal, Select } from '../../components/common';
import { ImageUploader } from '../../components/admin';
import { useImages, useUploadImage, useDeleteImage } from '../../hooks';
import type { SiteImage, ImageFormData, ImageCategory } from '../../types';

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'hero', label: 'Hero Images' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'programs', label: 'Programs' },
  { value: 'social', label: 'Social' },
  { value: 'general', label: 'General' },
];

const categoryColors: Record<string, string> = {
  hero: 'bg-blue-100 text-blue-800',
  gallery: 'bg-green-100 text-green-800',
  programs: 'bg-purple-100 text-purple-800',
  social: 'bg-pink-100 text-pink-800',
  general: 'bg-gray-100 text-gray-800',
};

export function Images() {
  const [categoryFilter, setCategoryFilter] = useState<ImageCategory | ''>('');
  const { data: images, isLoading, error } = useImages(categoryFilter || undefined);
  const uploadImage = useUploadImage();
  const deleteImage = useDeleteImage();

  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [deletingImage, setDeletingImage] = useState<SiteImage | null>(null);

  const handleUpload = async (file: File, data: ImageFormData) => {
    await uploadImage.mutateAsync({ file, data });
  };

  const handleDelete = async () => {
    if (deletingImage) {
      await deleteImage.mutateAsync(deletingImage.id);
      setDeletingImage(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Images</h1>
          <p className="text-gray-600">Manage site images and gallery.</p>
        </div>
        <Button onClick={() => setIsUploaderOpen(true)} leftIcon={<Plus size={18} />}>
          Upload Image
        </Button>
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Filter by:</label>
          <div className="w-48">
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ImageCategory | '')}
            />
          </div>
        </div>
      </Card>

      {/* Images Grid */}
      {isLoading ? (
        <Loading text="Loading images..." />
      ) : error ? (
        <Card className="text-center py-8">
          <p className="text-red-600">Error loading images. Please try again.</p>
        </Card>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} padding="none" className="overflow-hidden group">
              <div className="aspect-square bg-gray-100 relative">
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-300" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {image.url && (
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                      title="Open in new tab"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <button
                    onClick={() => setDeletingImage(image)}
                    className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <p className="font-medium text-navy text-sm truncate" title={image.name}>
                  {image.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {image.category && (
                    <span className={`px-2 py-0.5 text-xs rounded capitalize ${categoryColors[image.category] || categoryColors.general}`}>
                      {image.category}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {categoryFilter ? 'No Images in This Category' : 'No Images Yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {categoryFilter
              ? 'Try selecting a different category or upload new images.'
              : 'Upload your first image to get started.'}
          </p>
          <Button onClick={() => setIsUploaderOpen(true)} leftIcon={<Plus size={18} />}>
            Upload Image
          </Button>
        </Card>
      )}

      {/* Image Uploader Modal */}
      <ImageUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onUpload={handleUpload}
        isLoading={uploadImage.isPending}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingImage}
        onClose={() => setDeletingImage(null)}
        onConfirm={handleDelete}
        title="Delete Image"
        message={`Are you sure you want to delete "${deletingImage?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        isLoading={deleteImage.isPending}
      />
    </div>
  );
}

export default Images;
