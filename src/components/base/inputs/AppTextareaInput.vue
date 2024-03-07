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
        modelValue: {}
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
        :class="formGroupClass"
    >
        <label
            v-if="label"
            :for="id"
            :class="[
                `text-b6 font-semibold text-dark uppercase bg-white`,
                {'text-error': errorMessage}
            ]">
            {{ label }}
        </label>
        <textarea
            :id="id"
            :name="name"
            v-model="value"
            :placeholder="placeholder"
            :readonly="readOnly"
            :class="[
                formControlSizeClass,
                formControlClass,
                readOnly ? 'text-mid border-lighter focus:!border-lighter bg-background' : '',
                errorMessage ? 'border-error focus:border-error' : 'border-grey focus:border-primary'
            ]"
        />
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>
