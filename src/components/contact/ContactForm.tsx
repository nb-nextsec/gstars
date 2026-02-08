import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Input, Textarea, Select } from '../common';
import { contactApi } from '../../api';
import type { ContactFormData } from '../../types';

const subjectOptions = [
  { value: '', label: 'Select a subject...' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'programs', label: 'Program Information' },
  { value: 'registration', label: 'Registration' },
  { value: 'sponsorship', label: 'Sponsorship Opportunities' },
  { value: 'volunteer', label: 'Volunteering' },
  { value: 'other', label: 'Other' },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await contactApi.send(data);

      if (response.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(response.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700 mb-6">
          Thank you for contacting us. We'll get back to you as soon as possible.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitStatus(null)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Error sending message</p>
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Your Name"
          placeholder="John Smith"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Phone Number (Optional)"
          type="tel"
          placeholder="0400 000 000"
          {...register('phone')}
        />

        <Select
          label="Subject"
          options={subjectOptions}
          error={errors.subject?.message}
          {...register('subject', {
            required: 'Please select a subject',
          })}
        />
      </div>

      <Textarea
        label="Your Message"
        placeholder="How can we help you?"
        rows={5}
        error={errors.message?.message}
        {...register('message', {
          required: 'Message is required',
          minLength: { value: 10, message: 'Message must be at least 10 characters' },
        })}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
          rightIcon={<Send size={18} />}
        >
          Send Message
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
