'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Notification {
  id: string;
  type: 'event' | 'ticket' | 'transport' | 'emergency' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export default function NotificationsPage() {
  const t = useTranslations('notifications');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'emergency',
      title: 'Weather Alert',
      message: 'High temperatures expected tomorrow. Stay hydrated and seek shade during outdoor events.',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'event',
      title: 'Event Starting Soon',
      message: 'Swimming Finals at Aquatics Centre starts in 1 hour. Don\'t forget your ticket!',
      time: '1 hour ago',
      read: false,
      actionUrl: '/events',
    },
    {
      id: '3',
      type: 'ticket',
      title: 'Ticket Confirmed',
      message: 'Your ticket for Basketball Semi-Finals has been confirmed. Check your tickets.',
      time: '2 hours ago',
      read: true,
      actionUrl: '/tickets',
    },
    {
      id: '4',
      type: 'transport',
      title: 'Metro Service Update',
      message: 'Gold Line running with extended hours during the Games. Last train at midnight.',
      time: '5 hours ago',
      read: true,
      actionUrl: '/transport',
    },
    {
      id: '5',
      type: 'general',
      title: 'Welcome to Hayyak Asia 2030!',
      message: 'Thank you for joining us. Explore events, book tickets, and plan your journey.',
      time: '1 day ago',
      read: true,
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'event': return '🏆';
      case 'ticket': return '🎫';
      case 'transport': return '🚇';
      default: return '📢';
    }
  };

  const getTypeBadgeVariant = (type: string): 'default' | 'success' | 'warning' | 'error' => {
    switch (type) {
      case 'emergency': return 'error';
      case 'event': return 'success';
      case 'ticket': return 'warning';
      default: return 'default';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
              <p className="text-primary-100">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up!'
                }
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button variant="primary" size="sm">All</Button>
          <Button variant="outline" size="sm">Events</Button>
          <Button variant="outline" size="sm">Tickets</Button>
          <Button variant="outline" size="sm">Transport</Button>
          <Button variant="outline" size="sm">Emergency</Button>
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <Card
                key={notification.id}
                className={`transition-all ${!notification.read ? 'border-s-4 border-s-primary-500 bg-primary-50/50 dark:bg-primary-900/20' : ''}`}
              >
                <CardBody>
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'emergency'
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-semibold ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                            {notification.title}
                          </h3>
                          <Badge variant={getTypeBadgeVariant(notification.type)} size="sm">
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                          {notification.time}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        {notification.actionUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = notification.actionUrl!}
                          >
                            View Details
                          </Button>
                        )}
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardBody>
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🔔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No notifications
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You're all caught up! Check back later for updates.
                </p>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardBody>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Event updates and reminders', enabled: true },
                { label: 'Ticket confirmations', enabled: true },
                { label: 'Transport alerts', enabled: true },
                { label: 'Emergency notifications', enabled: true },
                { label: 'Promotional offers', enabled: false },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{pref.label}</span>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      pref.enabled
                        ? 'bg-primary-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        pref.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
