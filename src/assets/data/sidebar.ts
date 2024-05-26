export const sideBarList: any = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard/main',
    permissionsArray: [],
    expand: false,
  },
  {
    label: 'User',
    icon: 'group',
    route: '/account/users',
    permissionsArray: ['users_post'],
    expand: false,
    childItems: [
      {
        label: 'UR Mapping',
        icon: 'folder_supervised',
        route: '/account/user-role',
        permissionsArray: ['user_role_mapping_post'],
      },
    ],
  },
  {
    label: 'RR Mapping',
    icon: 'join_inner',
    route: '/mapping/route-role',
    permissionsArray: ['role_route_mappings_post'],
    expand: false,
    childItems: [
      {
        label: 'Route',
        icon: 'route',
        route: '/mapping/route',
        permissionsArray: ['routes_post'],
      },
      {
        label: 'Role',
        icon: 'person',
        route: '/mapping/role',
        permissionsArray: ['roles_post'],
      },
    ],
  },
];
