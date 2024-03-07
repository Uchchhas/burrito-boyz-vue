<script setup>
    import {computed} from 'vue';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import {useField} from 'vee-validate';
    import AppInputError from '@/components/base/inputs/AppInputError.vue';

    // Define props
    const props = defineProps({
        type: {
            type: String,
            default: 'text'
        },
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: ''
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        successMessage: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            required: false,
        },
        inputWrapperStyle: {
            type: String,
            default: null
        },
        inputSize: {
            type: String,
            default: 'medium'
        },
        formGroupClass: {
            type: String,
            default: 'relative w-full mb-8 group'
        },

        // Datepicker
        range: {
            type: Boolean,
            default: false
        },
        enableTime: {
            type: Boolean,
            default: false
        },
        monthPicker: {
            type: Boolean,
            default: false
        },
        yearPicker: {
            type: Boolean,
            default: false
        },
        hideInputIcon: {
            type: Boolean,
            default: false
        },
        hideClearIcon: {
            type: Boolean,
            default: false
        },
        menuPosition: {
            type: String,
            default: 'left'
        },

        modelValue: {},
    });

    // Define emits
    const emit = defineEmits(['update:modelValue', 'onChange']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });

    // Define computed
    const formControlSizeClass = computed(() => {
        if (props.inputSize === 'small') {
            return 'h-[34px] px-2.5 py-1.5 text-b4'
        } else if (props.inputSize === 'xs-small') {
            return 'h-[31px] px-2.5 py-1 text-b4'
        } else {
            return `${props.type === 'textarea' ? 'h-32' : 'h-11'} pl-4 ${props.type === 'password' ? 'pr-10' : 'pr-4'} text-b2`
        }
    });
    const formControlClass = computed(() => {
        return 'w-full border rounded placeholder:text-placeholder text-dark focus:ring-transparent focus-visible:outline-none'
    });
</script>

<template>
    <div :class="formGroupClass">
        <label
            v-if="label"
            :for="id"
            :class="[
                `text-b6 font-semibold text-dark uppercase bg-white`,
                {'text-error': errorMessage}
            ]">
            {{ label }}
        </label>
        <div class="flex items-center gap-[10px]">
            <VueDatePicker
                v-model="value"
                :auto-apply="true"
                :enable-time-picker="enableTime"
                :month-picker="monthPicker"
                :year-picker="yearPicker"
                :range="range"
                :multi-calendars="range"
                :position="range ? 'right' : menuPosition"
                :hide-input-icon="hideInputIcon"
                :input-class-name="`${formControlSizeClass} ${formControlClass} !rounded ${range ? 'w-[195px] px-[15px] leading-[34px] text-center' : ''} ${hideInputIcon ? '' : 'pl-8'} ${hideClearIcon ? 'hide-clear-icon' : ''} ${errorMessage ? '!border-error focus:!border-error' : '!border-grey focus:border-primary'}`"
                :menu-class-name="`${range || menuPosition === 'right' ? 'dp--menu-wrapper_right' : null} ${monthPicker ? 'dp--menu-wrapper_month' : null}`"
                calendar-cell-class-name="text-b4"
                :placeholder="placeholder"
            />
        </div>
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>
