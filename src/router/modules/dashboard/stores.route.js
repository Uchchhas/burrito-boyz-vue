export const storeRoutes = [
    {
        path: '/stores',
        name: 'store.index',
        component: () => import('@/views/stores/Index.vue'),
        meta: {
            title: 'All Stores',
            authRequired: true,
        },
    }
];
