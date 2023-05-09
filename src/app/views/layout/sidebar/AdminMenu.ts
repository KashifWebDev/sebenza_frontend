import { MenuItem } from './menu.model';

export const AdminMenu: MenuItem[] = [
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
    label: 'Users & Roles',
    isTitle: true
  },
  {
    label: 'Users Management',
    icon: 'users',
    subItems: [
      {
        label: 'Users Directory',
        link: 'users-management'
      },
      {
        label: 'Add New User',
        link: 'users-management/add-user',
      }
    ]
  },
  {
    label: 'Roles Management',
    icon: 'user-plus',
    subItems: [
      {
        label: 'All Roles',
        link: 'roles-management'
      },
      {
        label: 'Add Role',
        link: 'roles-management/add-role',
      }
    ]
  }
  ];
