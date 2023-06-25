import { MenuItem } from './menu.model';

export const UserMenu: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: 'home'
  },
  {
    label: 'Quick Links',
    isTitle: true
  },
  {
    label: 'Meetings Schedules',
    icon: 'mail',
    subItems: [
      {
        label: 'My Meetings',
        link: 'meeting'
      },
      {
        label: 'Add a Meeting',
        link: 'meeting/new'
      }
    ]
  },
  {
    label: 'News & Updates',
    isTitle: true
  },
  {
    label: 'Announcements',
    icon: 'bell',
    link: 'news/all-news'
  },
  {
    label: 'Help & Support',
    isTitle: true
  },
  {
    label: 'Tickets System',
    icon: 'mail',
    subItems: [
      {
        label: 'My Tickets',
        link: 'support/tickets'
      },
      {
        label: 'Generate New Ticket',
        link: 'support/ticket/new'
      }
    ]
  },
  ];
