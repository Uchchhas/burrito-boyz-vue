export const authRoutes = {
    path: '/', name: 'GuestLayout', component: () => import('@/layouts/GuestLayout.vue'),
    children: [
        {
            path: '/auth/login',
            name: 'auth.login',
            component: () => import('@/views/auth/Login.vue'),
            meta: {
                title: 'Login',
            },
        },
        {
            path: '/auth/forgot-password',
            name: 'auth.forgot_password',
            component: () => import('@/views/auth/ForgotPassword.vue'),
            meta: {
                title: 'Forgot Password',
            },
        },
        {
            path: '/auth/reset-password',
            name: 'auth.reset_password',
            component: () => import('@/views/auth/ResetPassword.vue'),
            meta: {
                title: 'Reset Password',
            },
        },
    ]
}