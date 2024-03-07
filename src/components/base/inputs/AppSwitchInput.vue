<script setup>
    import {computed} from 'vue';
    import {useField} from 'vee-validate';
    import AppInputError from '@/components/base/inputs/AppInputError.vue';

    // Define props
    const props = defineProps({
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
        formGroupClass: {
            type: String,
            default: 'relative w-full mb-8 group'
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
    <div
        :class="[
                `inline-flex items-center border-grey`,
                formControlSizeClass,
                formControlClass,
                inputWrapperStyle,
                { 'has-error': !!errorMessage}
            ]"
    >
        <label
            :for="id"
            class="inline-flex items-center cursor-pointer"
        >
            <input
                type="checkbox"
                :name="name"
                :id="name"
                value=""
                v-model="value"
                @change="emit('onChange')"
                class="sr-only peer"
            />
            <span
                class="relative w-[26px] h-[15px] bg-grey peer-focus:outline-none peer-focus:ring-0 rounded-[20px] peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:w-[11px] after:h-[11px] after:transition-all peer-checked:bg-primary"/>
            <span v-if="label" class="ms-2 text-mid text-b4">{{ label }}</span>
        </label>
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>
