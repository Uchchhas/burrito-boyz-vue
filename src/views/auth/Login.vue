<script setup>
    import {reactive, ref, onBeforeMount} from 'vue';
    import {useRouter} from 'vue-router';
    import {Form} from 'vee-validate';
    import {loginSchema} from '@/config/validationSchema.js';
    import AppInput from '@/components/base/inputs/AppInput.vue';
    import {useAuthStore, useErrorStore} from '@/stores';
    import AppButton from "@/components/base/AppButton.vue";

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
    <div class="overflow-hidden bg-white prose bg-[url('/images/background-auth.jpg')] bg-no-repeat bg-center">
        <div class="min-h-screen grid place-items-center">
            <div class="w-full max-w-[500px] py-12 px-10 rounded-xl border border-off-white-200 shadow-custom-1">
                <header class="mb-8">
                    <div class="flex justify-center">
                        <img
                            width="262"
                            height="40"
                            src="/images/logo.svg"
                            class="mb-12"
                            alt="Logo"
                        />
                    </div>
                    <h3 class="mb-3">Welcome back</h3>
                    <h2 class="mb-10">Let’s Login to Your Account</h2>
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
                            form-group-class="relative mb-2"
                            v-model="formData.password"
                        />
                        <div class="mb-10 text-right">
                            <router-link
                                to="/auth/forgot-password"
                                class="text-b4 text-info font-semibold hover:text-teal"
                            >
                                Forgot Password?
                            </router-link>
                        </div>
                        <p
                            v-if="![401,422].includes(errorStore.errorCode) && errorStore.errorMessage"
                            class="text-b6 mt-[0] mb-3 text-danger"
                        >
                            {{ errorStore.errorMessage }}
                        </p>
                        <app-button
                            button-type="submit"
                            button-size="large"
                            title="Login"
                            full-width
                        />
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

