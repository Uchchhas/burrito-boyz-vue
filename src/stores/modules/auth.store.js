import { defineStore } from 'pinia';
import { authService } from "@/services";
import { handleCommonActions } from "@/utils";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
    }),
    actions: {
        resetAuth(){
            this.user = null;
        },
        async login(payload) {
            return await handleCommonActions(async () => {
                await authService.getCookieCredential();
                await authService.login(payload);
            });
        },
        async authorize() {
            return await handleCommonActions(async () => {
                const response = await authService.authorize();
                this.user = response.data?.data ?? null;
            });
        },
        async logout() {
            return await handleCommonActions(async () => {
                await authService.logout();
                this.resetAuth();
                this.router.push({name: 'auth.login'});
            });
        },
    }
});