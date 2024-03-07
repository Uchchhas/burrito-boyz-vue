<template>
    <div class="pt-20 md:pl-[255px] pb-16 prose">
        <main class="p-7">
            <router-view :key="$route.fullPath"/>
        </main>
    </div>
</template>
<script setup>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();

authStore.authorize();
</script>
