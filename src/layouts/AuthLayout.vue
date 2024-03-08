<template>
    <app-header/>
    <div class="pt-20 prose">
        <main class="p-7">
            <router-view :key="$route.fullPath"/>
        </main>
    </div>
</template>

<script setup>
    import {useAuthStore} from '@/stores';
    import AppHeader from '@/layouts/AppHeader.vue';

    const authStore = useAuthStore();
    authStore.authorize();
</script>
