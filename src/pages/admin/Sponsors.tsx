import { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Award, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, Button, Loading, ConfirmModal } from '../../components/common';
import { SponsorEditor } from '../../components/admin';
import { useSponsors, useCreateSponsor, useUpdateSponsor, useDeleteSponsor, useReorderSponsors } from '../../hooks';
import type { Sponsor, SponsorFormData } from '../../types';

export function Sponsors() {
  const { data: sponsors, isLoading, error } = useSponsors();
  const createSponsor = useCreateSponsor();
  const updateSponsor = useUpdateSponsor();
  const deleteSponsor = useDeleteSponsor();
  const reorderSponsors = useReorderSponsors();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [deletingSponsor, setDeletingSponsor] = useState<Sponsor | null>(null);

  const sortedSponsors = sponsors
    ? [...sponsors].sort((a, b) => a.display_order - b.display_order)
    : [];

  const handleCreate = () => {
    setEditingSponsor(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setIsEditorOpen(true);
  };

  const handleSave = async (data: SponsorFormData) => {
    if (editingSponsor) {
      await updateSponsor.mutateAsync({ id: editingSponsor.id, data });
    } else {
      await createSponsor.mutateAsync(data);
    }
  };

  const handleDelete = async () => {
    if (deletingSponsor) {
      await deleteSponsor.mutateAsync(deletingSponsor.id);
      setDeletingSponsor(null);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0 || sortedSponsors.length < 2) return;
    const newOrder = sortedSponsors.map(s => s.id);
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    await reorderSponsors.mutateAsync(newOrder);
  };

  const handleMoveDown = async (index: number) => {
    if (index >= sortedSponsors.length - 1) return;
    const newOrder = sortedSponsors.map(s => s.id);
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    await reorderSponsors.mutateAsync(newOrder);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Sponsors</h1>
          <p className="text-gray-600">Manage club sponsors and partners.</p>
        </div>
        <Button onClick={handleCreate} leftIcon={<Plus size={18} />}>
          Add Sponsor
        </Button>
      </div>

      {/* Sponsors List */}
      {isLoading ? (
        <Loading text="Loading sponsors..." />
      ) : error ? (
        <Card className="text-center py-8">
          <p className="text-red-600">Error loading sponsors. Please try again.</p>
        </Card>
      ) : sortedSponsors.length > 0 ? (
        <div className="space-y-3">
          {sortedSponsors.map((sponsor, index) => (
            <Card key={sponsor.id} className="flex items-center gap-4">
              {/* Reorder arrows */}
              <div className="flex flex-col gap-1 flex-shrink-0">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0 || reorderSponsors.isPending}
                  className="p-1 text-gray-400 hover:text-navy hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === sortedSponsors.length - 1 || reorderSponsors.isPending}
                  className="p-1 text-gray-400 hover:text-navy hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Logo thumbnail */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {sponsor.logo_url ? (
                  <img
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain p-1"
                  />
                ) : (
                  <span className="text-gray-400 text-xl font-bold">
                    {sponsor.name[0]}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-navy truncate">{sponsor.name}</h3>
                  {!sponsor.is_active && (
                    <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                      Inactive
                    </span>
                  )}
                </div>
                {sponsor.description && (
                  <p className="text-sm text-gray-500 mt-0.5 truncate">{sponsor.description}</p>
                )}
                {sponsor.website_url && (
                  <a
                    href={sponsor.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline flex items-center gap-1 mt-1"
                  >
                    <ExternalLink size={12} />
                    Visit Website
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(sponsor)}
                  leftIcon={<Edit2 size={16} />}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeletingSponsor(sponsor)}
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
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Sponsors Yet</h3>
          <p className="text-gray-500 mb-4">Add your first sponsor to get started.</p>
          <Button onClick={handleCreate} leftIcon={<Plus size={18} />}>
            Add Sponsor
          </Button>
        </Card>
      )}

      {/* Sponsor Editor Modal — key forces remount so useForm gets fresh defaultValues */}
      <SponsorEditor
        key={editingSponsor ? editingSponsor.id : 'new'}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
        sponsor={editingSponsor}
        isLoading={createSponsor.isPending || updateSponsor.isPending}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingSponsor}
        onClose={() => setDeletingSponsor(null)}
        onConfirm={handleDelete}
        title="Delete Sponsor"
        message={`Are you sure you want to delete "${deletingSponsor?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        isLoading={deleteSponsor.isPending}
      />
    </div>
  );
}

export default Sponsors;
