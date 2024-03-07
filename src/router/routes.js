import { moduleRoutes } from "./modules";

export default [
    ...moduleRoutes,
    ...[
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("@/views/NotFound.vue"),
            meta: {
                title: 'Not Found',
            },
        }
    ]
];