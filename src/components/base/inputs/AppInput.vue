<script setup>
    import {computed, ref, watch} from 'vue';
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
        showSearch: {
            type: Boolean,
            default: false
        },
        checkAll: {
            type: Boolean,
            default: false
        },
        multiselect: {
            type: Boolean,
            default: false
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
        menuPosition: {
            type: String,
            default: 'left'
        },
        dropdownMenuIcon: {
            type: String,
            default: 'icon-sort-down-regular'
        },
        inputIcon: {
            type: String,
            default: null
        },

        // File
        fileType: {
            type: String,
            default: 'image.*'
        },
        acceptedFileTypes: {
            type: String,
            default: '.png, .jpg, .jpeg, .webp'
        },
        fileUploaderType: {
            type: String,
            default: 'avatar'
        },
        fileUploaderLabel: {
            type: String,
            default: 'Choose Image'
        },
        showRemoveFile: {
            type: Boolean,
            default: false
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

        modelValue: {},
    });

    // Define emits
    const emit = defineEmits(['update:modelValue', 'onChange']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });

    // Data
    const passwordType = ref(props.type);

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

    // Methods
    const formatPhoneForFrontend = (phone) => {
        try {
            let phoneValue = phone
                .replace(/\D/g, "")
                .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

            return !phoneValue[2]
                ? phoneValue[1]
                : '(' + phoneValue[1] + ')' + " " + phoneValue[2] + (phoneValue[3] ? "-" + phoneValue[3] : "");
        } catch (e) {
            return phone;
        }
    }

    const handlePhoneInput = () => {
        value.value = formatPhoneForFrontend(value.value);
    }

    // Watch effects
    watch(() => props.modelValue, (val) => {
        if (props.type === 'phone') {
            value.value = formatPhoneForFrontend(value.value)
        }
    });
</script>

<template>
    <template v-if="type === 'text' || type === 'number' || type === 'email' || type === 'password'">
        <div
            :class="formGroupClass"
        >
            <label
                v-if="label"
                :for="id"
                :class="[
                    `mb-[6px] text-b5 font-semibold text-grey-200 capitalize bg-white`,
                    {'text-danger': errorMessage}
                ]">
                {{ label }}
            </label>
            <input
                :type="type === 'password' ? passwordType : type"
                :id="id"
                :name="name"
                v-model="value"
                :placeholder="placeholder"
                :readonly="readOnly"
                :class="[
                    formControlSizeClass,
                    formControlClass,
                    readOnly ? 'text-mid border-lighter focus:!border-lighter bg-background' : '',
                    errorMessage ? 'border-danger focus:border-danger' : 'border-off-white-400 focus:border-primary'
                ]"
            />
            <span
                v-if="inputIcon && type !== 'password'"
                type="button"
                class="absolute top-[10px] right-4 text-light text-b1"
            >
                <i :class="inputIcon"/>
            </span>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform -translate-y-0.5 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-0.5 opacity-0"
            >
                <button
                    v-if="type === 'password' && value"
                    type="button"
                    class="absolute top-[10px] right-4 text-light text-b1"
                    @click="passwordType = passwordType === 'password' ? 'text' : 'password'"
                >
                    <i :class="passwordType === 'password' ? 'icon-eye-regular' : 'icon-eye-slash-regular'"/>
                </button>
            </transition>
            <app-input-error :error-message="errorMessage"/>
        </div>
    </template>

    <template v-if="type === 'phone'">
        <div
            :class="formGroupClass"
        >
            <label
                v-if="label"
                :for="id"
                :class="[
                    `absolute left-4 top-[-9px] px-0.5 text-b6 font-semibold text-dark uppercase bg-white`,
                    {'text-danger': errorMessage}
                ]">
                {{ label }}
            </label>
            <input
                :type="type"
                :id="id"
                :name="name"
                v-model="value"
                :placeholder="placeholder"
                :readonly="readOnly"
                :class="[
                    formControlSizeClass,
                    formControlClass,
                    readOnly ? 'text-mid border-lighter focus:!border-lighter bg-background' : '',
                    errorMessage ? 'border-danger focus:border-danger' : 'border-grey focus:border-primary'
                ]"
                @input="handlePhoneInput"
            />
            <app-input-error :error-message="errorMessage"/>
        </div>
    </template>
</template>
