<script setup>
    // Define props
    import {computed} from 'vue';

    const props = defineProps({
        url: {
            type: String,
            default: null
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        buttonSize: {
            type: String,
            default: 'medium'
        },
        buttonColor: {
            type: String,
            default: 'primary'
        },
        buttonType: {
            type: String,
            default: 'button'
        },
        title: {
            type: String,
            default: null
        },
        onClickButton: {
            type: Function,
            default: null
        }
    });

    // Define computed
    const buttonClass = computed(() => {
        let color = '',
            size = '';

        if (props.buttonColor === 'primary') color = `text-white border-primary bg-primary hover:shadow-btn-primary`;
        else if (props.buttonColor === 'secondary') color = `text-grey-400 border-off-white-200 hover:border-off-white-300 bg-off-white-200 hover:bg-off-white-300`;

        if (props.buttonSize === 'medium') size = `py-[9px]`;
        else if (props.buttonSize === 'large') size = `py-[13px]`;

        return `${props.fullWidth ? 'w-full flex' : 'inline-flex'} ${color} font-semibold text-b4 items-center justify-center ${size} px-[14px] rounded-[6px] transition`
    });
</script>

<template>
    <router-link v-if="url" :to="url" :class="buttonClass">
        <slot>{{ title }}</slot>
    </router-link>
    <button v-else :type="buttonType" :class="buttonClass" @click="onClickButton">
        <slot>{{ title }}</slot>
    </button>
</template>