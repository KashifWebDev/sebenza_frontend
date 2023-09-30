import { MenuItem } from './menu.model';

export const HrMenu: MenuItem[] = [
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
    label: 'HR & Payroll',
    isTitle: true
  },
  {
    label: 'Pay Frequency',
    icon: 'bar-chart-2',
    link: 'hr'
  },
  {
    label: 'Employees salary',
    icon: 'pie-chart',
    subItems: [
      {
        label: 'Salary Details',
        link: 'hr/salaries'
      },
      {
        label: 'Add New Salary',
        link: 'hr/salaries/new'
      },
    ]
  },
  {
    label: 'Withdraw Requests',
    icon: 'alert-circle',
    link: 'hr/withdraw-requests'
  },
  {
    label: 'Value Added Tax (VAT)',
    icon: 'trending-up',
    link: 'hr/vat'
  },
  {
    label: 'Terms & Conditions',
    icon: 'check',
    subItems: [
      {
        label: 'Add New Term',
        link: 'hr/add-new-term'
      },
      {
        label: 'All Terms',
        link: 'hr/term-conditions'
      },
      {
        label: 'Set Categories',
        link: 'hr/terms-categories'
      },
    ]
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
