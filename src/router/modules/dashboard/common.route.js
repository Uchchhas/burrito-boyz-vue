export const commonRoutes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views//dashboard/Index.vue'),
        meta: {
            title: 'Dashboard',
            name: 'dashboard',
            authRequired: true,
        },
    },
];
