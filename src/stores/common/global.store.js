import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
    id: 'global',
    state: () => ({
        isLoading: false,
    }),
    actions: {
       showLoader(){
        this.isLoading = true;
       },
       hideLoader(){
        this.isLoading = false;
       },
    }
});