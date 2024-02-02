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
  }
];
