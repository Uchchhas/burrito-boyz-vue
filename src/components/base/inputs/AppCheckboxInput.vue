<script setup>
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
        inlineAlignment: {
            type: Boolean,
            default: true
        },
        inputWrapperStyle: {
            type: String,
            default: null
        },
        options: {
            type: Array,
            default: () => {
                return [
                    {title: 'Option 1', value: 'option 1'},
                    {title: 'Option 2', value: 'option 2'},
                    {title: 'Option 3', value: 'option 3'},
                ]
            }
        },
        listTrackBy: {
            type: String,
            default: 'id'
        },
        listValueField: {
            type: String,
            default: 'value'
        },
        checkboxValue: {
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
        modelValue: {},
    });

    // Define emits
    const emit = defineEmits(['update:modelValue', 'onChange']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });
</script>

<template>
    <div
        :class="[inputWrapperStyle, { 'has-error': !!errorMessage}]"
    >
        <div class="inline-flex items-center gap-2.5">
            <input
                v-if="checkboxValue"
                :name="name"
                :id="id"
                type="checkbox"
                :value="checkboxValue"
                v-model="value"
                class='h-4 w-4 cursor-pointer border-2 border-grey rounded-xsm text-orange focus:ring-0 focus:ring-transparent focus-visible:outline-none'
            />
            <input
                v-else
                :name="name"
                :id="name"
                type="checkbox"
                v-model="value"
                @change="emit('onChange')"
                class='h-4 w-4 cursor-pointer border-2 border-grey rounded-xsm text-orange focus:ring-0 focus:ring-transparent focus-visible:outline-none'
            />
            <label v-if="label" :for="id" class="cursor-pointer text-b2 text-mid">
                {{ label }}
            </label>
        </div>
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>
