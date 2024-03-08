<script setup>
    import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue';

    // Define data
    const menuItems = [
        {
            title: 'Dashboard',
            icon: '',
            routeName: 'dashboard'
        },
        {
            title: 'Entry Records',
            icon: '',
            routeName: 'record.index'
        },
        {
            title: 'All Items',
            icon: '',
            routeName: 'item.index'
        },
        {
            title: 'All Stores',
            icon: '',
            routeName: 'store.index'
        },
        {
            title: 'Staff List',
            icon: '',
            routeName: 'staff.index'
        }
    ]
</script>

<template>
    <header class="w-full fixed top-0 z-[50] border-b border-off-white-400">
        <div class="container">
            <div class="h-16 grid grid-cols-[160px_auto_160px] items-center">
                <router-link to="/" class="block">
                    <img width="262" height="40" src="/images/logo.svg" alt="Burrito Boyz Logo">
                </router-link>
                <nav class="h-full">
                    <ul class="h-full flex gap-2 items-center justify-center">
                        <li v-for="(menuItem, menuItemIndex) in menuItems">
                            <router-link
                                :to="{name: menuItem?.routeName}"
                                class="relative py-5 px-3 text-grey-300 font-semibold text-b4 transition before:w-full before:h-1 before:absolute before:left-0 before:bottom-[-4px] before:rounded-t before:bg-grey-300 before:opacity-0 hover:before:opacity-100 before:transition"
                                active-class="text-primary before:opacity-100 before:!bg-primary"
                            >
                                {{ menuItem?.title }}
                            </router-link>
                        </li>
                    </ul>
                </nav>
                <div class="text-right">
                    <Menu as="div" class="relative inline-block text-left">
                        <div>
                            <MenuButton
                                class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                            >
                                Options
                            </MenuButton>
                        </div>

                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <MenuItems
                                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                            >
                                <div class="px-1 py-1">
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            :class="[
                                                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                                ]"
                                        >

                                            Edit
                                        </button>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            :class="[
                                                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                                ]"
                                        >
                                            Duplicate
                                        </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>
    </header>
</template>
