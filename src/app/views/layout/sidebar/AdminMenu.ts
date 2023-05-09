import { MenuItem } from './menu.model';

export const AdminMenu: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: 'dashboard'
  },
  {
    label: 'Quick Links',
    isTitle: true
  },
  {
    label: 'Users & Roles',
    icon: 'users',
    subItems: [
      {
        label: 'Users Management',
        link: 'users-management'
      },
      {
        label: 'Roles Management',
        link: 'roles-management',
      }
    ]
  }
  ];
