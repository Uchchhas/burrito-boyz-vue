import {commonRoutes} from './common.route';
import {recordRoutes} from '@/router/modules/dashboard/records.route.js';
import {itemRoutes} from '@/router/modules/dashboard/items.route.js';
import {storeRoutes} from '@/router/modules/dashboard/stores.route.js';
import {staffRoutes} from '@/router/modules/dashboard/staffs.route.js';

export const dashboardRoutes = {
    path: '', name: 'AuthLayout', component: () => import('@/layouts/AuthLayout.vue'),
    children: [
        ...commonRoutes,
        ...recordRoutes,
        ...itemRoutes,
        ...storeRoutes,
        ...staffRoutes
    ]
}
