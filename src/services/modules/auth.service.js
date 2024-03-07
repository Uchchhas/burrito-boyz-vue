import { apiClient } from "@/services";

export const authService = {
    async getCookieCredential() {
        return apiClient.get("/sanctum/csrf-cookie");
    },
    async login(payload) {
        return apiClient.post('/login', payload);
    },
    async authorize() {
        return apiClient.get('/authorize');
    },
    async forgotPassword(payload) {
        return apiClient.post('/forgot-password', payload);
    },
    async resetPassword(payload) {
        return apiClient.post('/reset-password', payload);
    },
    async logout() {
        return apiClient.post('/logout');
    },
};