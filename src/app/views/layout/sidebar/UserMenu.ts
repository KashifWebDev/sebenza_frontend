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
    label: 'News & Updates',
    isTitle: true
  },
  {
    label: 'Announcements',
    icon: 'bell',
    link: 'news/all-news'
  }
  ];
