export const itemRoutes = [
    {
        path: '/items',
        name: 'item.index',
        component: () => import('@/views/items/Index.vue'),
        meta: {
            title: 'All Items',
            authRequired: true,
        },
    }
];
