export const sideBarList: any = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard/main',
    expand: false,
  },
  {
    label: 'Mapping',
    icon: 'join_inner',
    route: '/mapping/route-role',
    expand: false,
    childItems: [
      {
        label: 'Route',
        icon: 'route',
        route: '/mapping/route',
      },
      {
        label: 'Role',
        icon: 'person',
        route: '/mapping/role',
      },
    ],
  },
];
