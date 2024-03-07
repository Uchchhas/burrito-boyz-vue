<script setup>
    import {ref} from 'vue';
    import {useRoute, useRouter} from 'vue-router';
    import { useAuthStore } from '@/stores';

    const authStore = useAuthStore();

    // Define composable
    const route = useRoute();
    const router = useRouter();


    // Data
    const openMobileMenu = ref(false);
    const userDropdownItems = [
        {title: 'My Profile', url: '/my-account', icon: 'icon-user-regular'},
        {title: 'Logout', action: 'logout', icon: 'icon-arrow-right-from-bracket-regular'}
    ];

    // Methods
    const toggleSidebar = () => {
        openMobileMenu.value = !openMobileMenu.value;
    }
</script>

<template>
    <header class="fixed top-0 left-0 md:left-[255px] right-0 z-[70]">
        <div class="h-20 bg-white">
            <div class="h-full flex items-center">
                <div class="flex flex-wrap items-center justify-between flex-1 px-5">
                    <!-- Header Left Nav Items -->
                    <ul class="flex items-center gap-2.5">
                        <li class="block md:hidden">
                            <router-link to="/">
                                <img width="30" height="32" src="/images/logo.svg" alt="Logo">
                            </router-link>
                        </li>
                        <li class="grid md:hidden place-items-center py-[5px] px-[15px] rounded text-b2 text-dark font-medium">
                            <button class="text-mid relative focus:outline-none bg-white"
                                    @click="toggleSidebar">
                                <span class="sr-only">Open main menu</span>
                                <i class="icon-bars-regular"/>
                            </button>
                        </li>
                    </ul>

                    <!-- Header Right Items -->
                    <ul class="flex items-center gap-5">
                        <li>
                            <div @click="authStore.logout" class="rounded-md bg-primary px-3.5 py-2 text-b4 font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark transition cursor-pointer">
                                Logout
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>
