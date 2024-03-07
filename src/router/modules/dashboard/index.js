import { commonRoutes } from './common.route';

export const dashboardRoutes = {
    path: '', name: 'AuthLayout', component: () => import('@/layouts/AuthLayout.vue'),
    children: [
        ...commonRoutes
    ]
}
