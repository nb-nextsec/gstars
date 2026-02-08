import { Link } from 'react-router-dom';
import { Calendar, Users, Image, Settings, ArrowRight, TrendingUp } from 'lucide-react';
import { Card } from '../../components/common';
import { useEvents, useSponsors, useImages } from '../../hooks';

export function Dashboard() {
  const { data: events } = useEvents();
  const { data: sponsors } = useSponsors();
  const { data: images } = useImages();

  const stats = [
    {
      label: 'Total Events',
      value: events?.length || 0,
      icon: Calendar,
      color: 'bg-blue-500',
      href: '/admin/events',
    },
    {
      label: 'Active Sponsors',
      value: sponsors?.filter((s) => s.is_active).length || 0,
      icon: Users,
      color: 'bg-green-500',
      href: '/admin/sponsors',
    },
    {
      label: 'Images',
      value: images?.length || 0,
      icon: Image,
      color: 'bg-purple-500',
      href: '/admin/images',
    },
  ];

  const quickActions = [
    {
      label: 'Add New Event',
      description: 'Create a new event for the calendar',
      href: '/admin/events',
      icon: Calendar,
    },
    {
      label: 'Manage Sponsors',
      description: 'Add or update sponsor information',
      href: '/admin/sponsors',
      icon: Users,
    },
    {
      label: 'Upload Images',
      description: 'Add new images to the gallery',
      href: '/admin/images',
      icon: Image,
    },
    {
      label: 'Site Settings',
      description: 'Update site content and configuration',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Geelong Stars admin panel.</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href}>
            <Card hover className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-navy mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.href}>
              <Card hover className="flex items-center gap-4">
                <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-navy" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-navy">{action.label}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-navy mb-4">Recent Activity</h2>
        <Card>
          <div className="flex items-center justify-center py-8 text-gray-500">
            <TrendingUp className="w-8 h-8 mr-3" />
            <span>Activity tracking coming soon</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
