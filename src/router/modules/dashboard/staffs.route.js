export const staffRoutes = [
    {
        path: '/staffs',
        name: 'staff.index',
        component: () => import('@/views/staffs/Index.vue'),
        meta: {
            title: 'All Staffs',
            authRequired: true,
        },
    }
];
