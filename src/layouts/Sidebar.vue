<script setup>
    import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
    import {useRoute, useRouter} from 'vue-router';

    // Define composable
    const route = useRoute();
    const router = useRouter();

    // Data
    const menuItems = [
        {
            title: 'Dashboard',
            route: 'dashboard',
            icon: 'icon-layer-group-regular'
        },
        {
            title: 'Projects',
            route: 'project.index',
            icon: 'icon-mountains-regular'
        },
        {
            title: 'Testimonials',
            route: 'testimonial.index',
            icon: 'icon-address-card-regular'
        },
        {
            title: 'Teams',
            route: 'team_member.index',
            icon: 'icon-user-group-regular'
        },
        {
            title: 'Contact Requests',
            route: 'contactUsRequest.index',
            icon: 'icon-phone-regular'
        },
        {
            title: 'Join Requests',
            route: 'joinUsRequest.index',
            icon: 'icon-laptop-regular'
        },
        {
            title: 'Get Quote Requests',
            route: 'getQuoteRequest.index',
            icon: 'icon-box-archive-regular'
        },
    ];
    const isMobile = ref(false);
    const openSidebarMobile = ref(false);

    // Computed values
    const menuItemClass = computed(() => {
        return `h-[38px] w-[38px] flex items-center justify-center rounded border border-grey group-hover:border-primary text-mid text-b2 group-hover:text-white transition group-hover:bg-primary`
    });

    // Methods
    const checkScreenWidth = () => {
        isMobile.value = window.innerWidth < 768;
    };

    const closeSidebar = () => {
        openSidebarMobile.value = false;
        useEventsBus().emit('closeSidebar', openSidebarMobile.value);
    }


    // Watching Bus
    useEventsBus().on('openMobileMenu', (payload) => {
        openSidebarMobile.value = payload;
    });

    // Lifecycle hooks
    onMounted(() => {
        checkScreenWidth();
    });

    // Check on window resize
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup the event listener when the component is unmounted
    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkScreenWidth);
    });

    const isActiveRoute = (item) => {
        return item?.route?.split(".")?.[0] === route?.name?.split(".")?.[0];
    }
</script>

<template>
    <aside :class="[
        `fixed top-0 bottom-0 z-10 transition-all`,
        '-left-[255px] md:left-0',
        isMobile && openSidebarMobile ? 'left-0 z-[100]' : '',
    ]">
        <div class="w-[255px] h-full relative z-10 border-r border-artboard bg-white">
            <div class="w-[255px] h-20 flex items-center justify-center">
                <router-link to="/">
                    <img width="150" src="/images/logo.svg" alt="Logo">
                </router-link>
            </div>
            <ul class="py-5 px-8 flex flex-col gap-6 border-t border-artboard">
                <li v-for="menu in menuItems" class="text-center">
                    <router-link
                        :to="{name: menu.route}"
                        class="flex items-center gap-4 group">
                        <div
                            :class="[
                                menuItemClass,
                                {'text-white border-primary bg-primary': isActiveRoute(menu)},
                            ]">
                            <i :class="menu.icon"/>
                        </div>
                        <div
                            :class="[`mt-[2px] text-b3 font-medium group-hover:text-primary transition`, {'text-primary': $route.name === menu.name}]">
                            {{ menu.title }}
                        </div>
                    </router-link>
                </li>
            </ul>
            <button
                v-if="isMobile && openSidebarMobile"
                type="button"
                class="w-8 h-8 absolute top-5 -right-4 grid place-items-center text-mid rounded-full bg-white shadow"
                @click="closeSidebar"
            >
                <i class="icon-xmark-regular"/>
            </button>
        </div>
        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in-out duration-500"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div
                v-if="isMobile && openSidebarMobile"
                class="fixed z-0 inset-0 bg-light bg-opacity-75"
                @click="closeSidebar"
            />
        </transition>
    </aside>
</template>
