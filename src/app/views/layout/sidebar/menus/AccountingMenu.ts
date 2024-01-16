import { MenuItem } from './menu.model';

export const AccountingMenu: MenuItem[] = [
  {
    label: 'Accounting',
    isTitle: true
  },
  {
    label: 'Meetings',
    icon: 'mail',
    link: 'accounting/meeting'
  },
  {
    label: 'Tasks',
    icon: 'list',
    link: 'accounting/tasks'
  },
  {
    label: 'Withdraws',
    icon: 'alert-circle',
    link: 'accounting/withdraws'
  },
  {
    label: 'Expenses',
    icon: 'dollar-sign',
    link: 'accounting/expenses'
  },
  {
    label: 'Estimate Quotes',
    icon: 'check',
    link: 'accounting/estimates'
  },
  {
    label: 'Products',
    icon: 'package',
    link: 'accounting/products'
  },
  {
    label: 'Stocks',
    icon: 'folder',
    link: 'accounting/stocks'
  },
  {
    label: 'Customer Data',
    icon: 'user',
    link: 'accounting/customers'
  },
  {
    label: 'Projects',
    icon: 'list',
    link: 'accounting/projects'
  },
  {
    label: 'Sales',
    icon: 'list',
    link: 'accounting/sales'
  }
];
