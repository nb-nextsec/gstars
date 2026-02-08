import { useState } from 'react';
import { Save, RefreshCw, FileText, Mail, Globe } from 'lucide-react';
import { Card, Button, Input, Textarea } from '../../components/common';
import { usePageContent, useUpdateContent, contentToObject } from '../../hooks';

export function Settings() {
  const { data: homeContent, isLoading: homeLoading } = usePageContent('home');
  const { data: contactContent, isLoading: contactLoading } = usePageContent('contact');
  const updateContent = useUpdateContent();

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Convert arrays to objects for easy form access
  const home = homeContent ? contentToObject(homeContent) : {};
  const contact = contactContent ? contentToObject(contactContent) : {};

  const handleSave = async (page: string, section: string, content: string) => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      await updateContent.mutateAsync({ page, section, content });
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch {
      setSaveMessage('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const isLoading = homeLoading || contactLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Settings</h1>
        <p className="text-gray-600">Manage site content and configuration.</p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {saveMessage}
        </div>
      )}

      {isLoading ? (
        <Card className="text-center py-12">
          <RefreshCw className="w-8 h-8 text-navy animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading settings...</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Home Page Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-navy">Home Page</h2>
                <p className="text-sm text-gray-600">Edit home page content</p>
              </div>
            </div>

            <div className="space-y-4">
              <ContentField
                label="Hero Title"
                value={home.hero_title || 'Welcome to Geelong Stars'}
                onSave={(value) => handleSave('home', 'hero_title', value)}
                isSaving={isSaving}
              />

              <ContentField
                label="Hero Subtitle"
                value={home.hero_subtitle || 'Building champions on and off the field'}
                onSave={(value) => handleSave('home', 'hero_subtitle', value)}
                isSaving={isSaving}
              />

              <ContentField
                label="About Preview"
                value={home.about_preview || ''}
                multiline
                onSave={(value) => handleSave('home', 'about_preview', value)}
                isSaving={isSaving}
              />
            </div>
          </Card>

          {/* Contact Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-navy">Contact Information</h2>
                <p className="text-sm text-gray-600">Edit contact details</p>
              </div>
            </div>

            <div className="space-y-4">
              <ContentField
                label="Address"
                value={contact.address || 'Geelong, Victoria, Australia'}
                onSave={(value) => handleSave('contact', 'address', value)}
                isSaving={isSaving}
              />

              <ContentField
                label="Email"
                value={contact.email || 'info@geelongstars.com.au'}
                onSave={(value) => handleSave('contact', 'email', value)}
                isSaving={isSaving}
              />

              <ContentField
                label="Phone"
                value={contact.phone || '(03) 5XXX XXXX'}
                onSave={(value) => handleSave('contact', 'phone', value)}
                isSaving={isSaving}
              />
            </div>
          </Card>

          {/* Content Pages */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-navy">Static Pages</h2>
                <p className="text-sm text-gray-600">Edit content pages</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              Additional page content settings coming soon. For now, you can edit the
              database directly or contact the developer for assistance.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

interface ContentFieldProps {
  label: string;
  value: string;
  multiline?: boolean;
  onSave: (value: string) => void;
  isSaving: boolean;
}

function ContentField({ label, value, multiline = false, onSave, isSaving }: ContentFieldProps) {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          {multiline ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={4}
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          )}
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} isLoading={isSaving} leftIcon={<Save size={14} />}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-sm whitespace-pre-wrap">{value || '(not set)'}</p>
      )}
    </div>
  );
}

export default Settings;
