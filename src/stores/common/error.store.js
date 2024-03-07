import {defineStore} from 'pinia';
import router from "@/router";
import {useAuthStore} from '@/stores';

export const useErrorStore = defineStore({
    id: 'error',
    state: () => ({
        error: {},
        showableErrorCodes: [403, 404, 500],
        errorCode: null,
    }),
    getters: {
        formErrors: state => {
            const errorBag = []

            if (Object.keys(state.error).length === 0) return errorBag;
            if (state.error && state.error.response.status === 422) {
                for (const key in state.error.response.data.errors) {
                    errorBag[key] = state.error.response.data.errors[key][0]
                }
                return errorBag;
            }
        },
        isShowableErrorCode: state => {
            return state.showableErrorCodes.includes(state.errorCode)
        },
        errorMessage: state => {
            return state.error?.response?.data?.message ?? null;
        }
    },
    actions: {
        setError(error) {
            this.error = error;
            if (error?.code == 'ERR_NETWORK') {
                console.log('Connection is not ok');
            }

            this.errorCode = error?.response?.status != undefined ? error?.response?.status : null;
            this.handleError()
        },
        handleError() {
            if (this.errorCode == 401) {
                setTimeout(() => {
                    if (router.currentRoute.value.name && router.currentRoute.value.name != 'auth.login') {
                        let query = router.currentRoute.value.query;
                        query.redirectFrom = router.currentRoute.value.name;
                        useAuthStore().resetAuth();

                        router.push({
                            name: 'auth.login',
                            query: query
                        })
                    } else {
                        router.push({name: 'auth.login'});
                    }
                }, 200)
            }
            if (this.errorCode == 406 || this.errorCode == 500) {
                swalAlert.warningAlert({title: this.errorMessage, text: ""});
            }

        },
        setErrorCode(code) {
            this.errorCode = code;
        }
    }
});