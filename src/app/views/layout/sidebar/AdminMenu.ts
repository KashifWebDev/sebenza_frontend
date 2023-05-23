import { MenuItem } from './menu.model';

export const AdminMenu: MenuItem[] = [
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
  },
  {
    label: 'Users Packages',
    icon: 'package',
    subItems: [
      {
        label: 'All Packages',
        link: 'user-packages'
      },
      {
        label: 'Add Package',
        link: 'user-packages/add-package',
      }
    ]
  },
  {
    label: 'Account Types',
    icon: 'shield',
    subItems: [
      {
        label: 'All Types',
        link: 'account-types'
      },
      {
        label: 'Add Account Type',
        link: 'account-types/add-account',
      }
    ]
  }
  ];
