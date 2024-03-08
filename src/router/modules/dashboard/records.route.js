export const recordRoutes = [
    {
        path: '/records',
        name: 'record.index',
        component: () => import('@/views/records/Index.vue'),
        meta: {
            title: 'Entry Records',
            authRequired: true,
        },
    }
];
