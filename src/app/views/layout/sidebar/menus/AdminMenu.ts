import { MenuItem } from './menu.model';

export const AdminMenu: MenuItem[] = [
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
  // {
  //   label: 'Users Packages',
  //   icon: 'package',
  //   subItems: [
  //     {
  //       label: 'All Packages',
  //       link: 'user-packages'
  //     },
  //     {
  //       label: 'Add Package',
  //       link: 'user-packages/add-package',
  //     }
  //   ]
  // },
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
  },
  {
    label: 'News and Updates',
    isTitle: true
  },
  {
    label: 'Announcements',
    icon: 'bell',
    subItems: [
      {
        label: 'All Announcements',
        link: 'news'
      },
      {
        label: 'Add a news',
        link: 'news/add-news',
      }
    ]
  },
  {
    label: 'App Settings',
    isTitle: true
  },
  {
    label: 'Basic Settings',
    icon: 'settings',
    link: 'app-settings'
  },
  {
    label: 'Help & Support',
    isTitle: true
  },
  {
    label: 'Tickets System',
    icon: 'mail',
    link: 'support/tickets'
  },
  {
    label: 'Whatsapp',
    icon: 'message-circle',
    subItems: [
      {
        label: 'All Numbers',
        link: 'support/whatsapp'
      },
      {
        label: 'Add New Whatsapp',
        link: 'support/whatsapp/add'
      }
    ]
  },
  {
    label: 'Marketing',
    isTitle: true
  },
  {
    label: 'Promo Codes',
    icon: 'gift',
    subItems: [
      {
        label: 'All Promo Codes',
        link: 'marketing/promocodes'
      },
      {
        label: 'Add New Code',
        link: 'marketing/promocodes/add'
      }
    ]
  },
  {
    label: 'Finance',
    isTitle: true
  },
  {
    label: 'Orders & Invoices',
    icon: 'credit-card',
    subItems: [
      {
        label: 'Orders History',
        link: 'orders'
      },
      {
        label: 'Invoices',
        link: 'invoices'
      }
    ]
  }
  ];
