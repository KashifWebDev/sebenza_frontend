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
    label: 'Invite Users',
    icon: 'user-plus',
    subItems: [
      {
        label: 'Email Invitation',
        link: 'invite-users'
      },
      {
        label: 'Import Excel File',
        link: 'invite-users/bulk-import'
      }
    ]
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
    label: 'My Tasks',
    icon: 'list',
    subItems: [
      {
        label: 'Tasks list',
        link: 'tasks'
      },
      {
        label: 'Add a Task',
        link: 'tasks/new'
      }
    ]
  },
  {
    label: 'My Calendar',
    icon: 'calendar',
    subItems: [
      {
        label: 'Visit Calendar',
        link: 'calendar'
      },
      {
        label: 'Add an Event',
        link: 'calendar/new'
      }
    ]
  },
  {
    label: 'Finance Management',
    isTitle: true
  },
  {
    label: 'My Orders',
    icon: 'inbox',
    subItems: [
      {
        label: 'Orders History',
        link: 'orders'
      },
      {
        label: 'New Order',
        link: 'orders/new'
      }
    ]
  },
  {
    label: 'Invoices',
    icon: 'credit-card',
    link: 'invoices'
  },
  {
    label: 'My Banks',
    icon: 'cloud',
    link: 'banks'
  },
  {
    label: 'Salary & Withdraws',
    icon: 'gift',
    subItems: [
      {
        label: 'My Salary',
        link: 'salary'
      },
      {
        label: 'Withdraw Requests',
        link: 'salary/withdraw'
      },
      {
        label: 'Make a Withdraw',
        link: 'salary/make-withdraw'
      }
    ]
  },
  {
    label: 'My Finances',
    icon: 'dollar-sign',
    subItems: [
      {
        label: 'All Expenses',
        link: 'expenses'
      },
      {
        label: 'Add Expense/Income',
        link: 'expenses/new'
      },
      {
        label: 'Expense Type',
        link: 'expenses/types'
      }
    ]
  },
  {
    label: 'Estimates & Quotes',
    isTitle: true
  },
  {
    label: 'Terms & Conditions',
    icon: 'check',
    subItems: [
      {
        label: 'Add New Term',
        link: 'quotes/add-new-term'
      },
      {
        label: 'All Terms',
        link: 'quotes/term-conditions'
      },
      {
        label: 'Set Categories',
        link: 'quotes/terms-categories'
      },
    ]
  },
  {
    label: 'Add new Quote',
    icon: 'plus-square',
    link: 'quotes/new-estimate'
  },
  {
    label: 'My Quotes',
    icon: 'settings',
    link: 'quotes/estimate-settings'
  },
  {
    label: 'Stock & Inventory',
    isTitle: true
  },
  {
    label: 'Stocks',
    icon: 'folder',
    subItems: [
      {
        label: 'Add Stock',
        link: 'stock/new'
      },
      {
        label: 'View Stocks',
        link: 'stock'
      }
    ]
  },
  {
    label: 'Products',
    icon: 'package',
    link: 'stock/products'
  },
  {
    label: 'Assets',
    icon: 'database',
    link: 'stock/assets'
  },
  {
    label: 'Warehouse',
    icon: 'home',
    link: 'stock/warehouse'
  },
  {
    label: 'Projects & Customers',
    isTitle: true
  },
  {
    label: 'Customers',
    icon: 'user',
    link: 'projects/customers'
  },
  {
    label: 'Projects',
    icon: 'book',
    link: 'projects'
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
  {
    label: 'Announcements',
    icon: 'bell',
    link: 'news/all-news'
  }
];
