import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Star, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card } from '../../components/common';
import type { LoginCredentials } from '../../types';

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-bg flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-navy border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data: LoginCredentials) => {
    setIsSubmitting(true);
    setError('');

    const success = await login(data);

    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-navy">Geelong Stars</h1>
          <p className="text-gray-500">Admin Portal</p>
        </div>

        {/* Login Form */}
        <Card>
          <h2 className="text-xl font-semibold text-navy mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Username"
              placeholder="Enter your username"
              error={errors.username?.message}
              {...register('username', { required: 'Username is required' })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isSubmitting}
              rightIcon={<LogIn size={18} />}
            >
              Sign In
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Geelong Stars. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
