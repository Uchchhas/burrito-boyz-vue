<script setup>
    import {useField} from 'vee-validate';

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
        :class="[`mb-8`, { 'has-error': !!errorMessage}]"
    >
        <label class="block mb-2 text-b6 font-semibold text-dark uppercase">
            {{ label }}
        </label>
        <div>
            <div
                :class="[
                    `items-center`,
                    inlineAlignment ? 'inline-flex ' : 'flex',
                    {'mr-[10px]': inlineAlignment && index !== options.length - 1},
                    {'mb-[10px]': !inlineAlignment && index !== options.length - 1}
                ]"
                v-for="(option, index) in options"
            >
                <label
                    :for="`radio-${name}-${index}`"
                    :class="[`h-11 flex items-center p-[10px] text-dark text-b2 leading-[27px] rounded border border-grey`]"
                >
                    <input
                        type="radio"
                        :id="`radio-${name}-${index}`"
                        :name="name"
                        :value="option[listValueField]"
                        class="h-4 w-4 border-gray-300 text-orange focus:ring-orange"
                        v-model="value"
                    />
                    <span class="ml-2">{{ option.title }}</span>
                </label>
            </div>
        </div>
    </div>
</template>
