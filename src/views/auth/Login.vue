<script setup>
    import {reactive, ref, onBeforeMount} from 'vue';
    import {useRouter} from 'vue-router';
    import {Form} from 'vee-validate';
    import {loginSchema} from '@/config/validationSchema.js';
    import AppInput from '@/components/base/inputs/AppInput.vue';
    import {useAuthStore, useErrorStore} from '@/stores';

    const authStore = useAuthStore();
    const errorStore = useErrorStore();

    // Define routes object
    const router = useRouter();

    onBeforeMount(async () => {
        await authStore.authorize();
        if (!errorStore.errorCode) {
            router.push({name: 'dashboard'});
        }
    });

    // Data
    const loading = ref(false);
    const formData = reactive({
        email: '',
        password: ''
    });

    // Methods
    const onSubmit = async (values, actions) => {
        let response;
        loading.value = true;
        await authStore.login(values);
        loading.value = false;

        if (!errorStore.errorCode) {
            router.push({name: "dashboard"});
        }

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors);
        }
    }
</script>

<template>
    <div class="overflow-hidden bg-white prose">
        <div class="min-h-screen grid place-items-center">
            <div class="w-full max-w-[410px] p-8 rounded-lg border border-lighter shadow-xl">
                <header class="mb-8 flex justify-center">
                    <img src="/images/logo.svg" alt="Logo">
                </header>
                <div class="">
                    <Form
                        @submit="onSubmit"
                        :validation-schema="loginSchema"
                    >
                        <app-input
                            id="email"
                            type="email"
                            name="email"
                            label="Email address"
                            placeholder="example@axilweb.com"
                            input-icon="icon-envelope-regular"
                            v-model="formData.email"
                        />
                        <app-input
                            id="password"
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Password"
                            v-model="formData.password"
                        />
                        <p class="text-b6 mt-[0] mb-3 text-error"
                           v-if="![401,422].includes(errorStore.errorCode) && errorStore.errorMessage">
                            {{ errorStore.errorMessage }}</p>
                        <router-link to="/auth/forgot-password"
                                     class="text-b2 text-mid font-medium hover:text-teal">
                            Forgot Password?
                        </router-link>
                        <button
                            type="submit"
                            class="rounded-md bg-primary px-3.5 py-3 text-b4 font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark transition">
                            Sign in
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
