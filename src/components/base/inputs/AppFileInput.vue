<script setup>
    import {ref, watch} from 'vue';
    import {useField} from 'vee-validate';
    import {useDropzone} from 'vue3-dropzone';
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
    const dropzoneInputRef = ref(null);

    // Methods
    const handleFileInput = (e) => {
        if (!e.currentTarget.files.length) {
            return
        }

        const previewWrapper = document.querySelector(`#imagePreview${props.id}`);
        const videoPreviewWrapper = document.getElementById('video-preview');

        let file = e.currentTarget.files[0],
            reader = new FileReader(),
            fileType = new RegExp(props.fileType);

        if (!file?.type.match(fileType)) {
            console.error('File type not supported');
        } else if (!file) {
            console.error('Not A File!');
        } else {
            reader.onload = () => {
                if (props.fileType === 'video.*') {
                    videoPreviewWrapper.src = reader.result;
                }
                previewWrapper.style.backgroundImage = `url('${reader.result}')`;
            }
            reader.readAsDataURL(file);
            emit('update:modelValue', file);
        }
    }

    const onDrop = (acceptFiles, rejectReasons) => {
        value.value = [...value.value, ...acceptFiles];
    }

    const handleClickDeleteFile = (index) => {
        value.value.splice(index, 1);
        emit('update:modelValue', value.value);
    }

    const createObjectURL = (file) => {
        if (typeof file === 'object') {
            return URL.createObjectURL(file);
        } else {
            return file;
        }
    }

    const {getRootProps, getInputProps, isDragActive, ...rest} = useDropzone({
        onDrop,
    });

    // Watch effects
    watch(() => isDragActive, () => {
        console.log('isDragActive', isDragActive.value, rest);
    });
</script>

<template>
    <template v-if="type === 'file'">
        <label
            v-if="label"
            :class="[`block mb-3 text-b6 font-semibold text-dark uppercase bg-white`]">
            {{ label }}
        </label>
        <div
            :class="[`relative`, fileUploaderType === 'avatar' ? 'w-[130px] h-[130px] mb-8 rounded-full' : 'w-full h-40']">
            <template v-if="fileUploaderType === 'avatar'">
                <div
                    :id="`imagePreview${id}`"
                    :class="[`w-full h-full border border-grey rounded-full bg-contain bg-no-repeat`]"
                    :style="`background-image: url(${value ? value : '/images/avatar-placeholder.svg'})`"
                >
                    <img v-if="!value" src="/images/avatar-placeholder.svg" alt="Placeholder image">
                </div>
                <label :for="id"
                       class="w-[30px] h-[30px] absolute bottom-0 right-0 grid place-items-center text-white cursor-pointer rounded-full border border-white bg-primary">
                    <input
                        type="file"
                        :id="id"
                        class="sr-only"
                        :accept="acceptedFileTypes"
                        @change="handleFileInput($event)"
                    />
                    <i class="icon-camera-regular"/>
                </label>
            </template>
            <template v-else>
                <div
                    :id="`imagePreview${id}`"
                    :class="[`w-full h-full relative flex flex-col items-center justify-between pt-3 border-2 border-dashed border-grey rounded bg-contain bg-center bg-no-repeat`]"
                    :style="`background-image: url(${value ? value : '/images/avatar-placeholder.svg'})`"
                >
                    <button
                        v-if="showRemoveFile"
                        type="button"
                        class="absolute top-3 right-3 flex gap-2 items-center px-3 py-1 text-white font-medium text-b5 rounded-[20px] bg-danger"
                        @click.prevent="value = null"
                    >
                        <i class="icon-xmark-regular"/> Remove
                    </button>
                    <img
                        width="90"
                        height="90"
                        v-if="!value"
                        src="/images/avatar-placeholder.svg"
                        class="rounded"
                        alt="Placeholder image"
                    />
                    <video
                        height="90"
                        v-if="fileType === 'video.*'"
                        :src="value"
                        muted
                        loop
                        id="video-preview"
                        class="max-h-[95px]"
                    />
                    <label :for="id"
                           class="w-full absolute left-0 bottom-0 flex gap-2 items-center justify-center px-2 py-2 text-white text-b4 cursor-pointer rounded-b border border-primary bg-primary">
                        <input
                            type="file"
                            :id="id"
                            class="sr-only"
                            :accept="acceptedFileTypes"
                            @change="handleFileInput($event)"
                        />
                        <i class="icon-camera-regular"/> {{ fileUploaderLabel }}
                    </label>
                </div>
            </template>
            <app-input-error :error-message="errorMessage"/>
        </div>
    </template>

    <template v-if="type === 'dropzone'">
        <label
            v-if="label"
            :class="[`block mb-3 text-b6 font-semibold text-dark uppercase bg-white`]">
            {{ label }}
        </label>
        <div class="relative">
            <div :class="[
                    `min-h-40 p-4 rounded-lg border-2 border-dashed border-grey`,
                    {'grid place-items-center': !value.length},
                    {'border-primary': isDragActive}
                ]">
                <div v-if="value.length > 0" class="flex flex-wrap gap-4">
                    <div
                        class="w-20 relative grid place-items-center rounded border border-grey"
                        v-for="(file, index) in value"
                        :key="index"
                    >
                        <img :src="createObjectURL(file)" :alt="file.name" class="rounded">
                        <span
                            class="w-5 h-5 absolute -top-2 -right-2 z-10 grid place-items-center text-white text-b6 rounded-full bg-danger"
                            @click="handleClickDeleteFile(index)"
                        >
                            <i class="icon-xmark-regular"/>
                        </span>
                    </div>
                </div>
                <div
                    ref="dropzoneInputRef"
                    :class="[
                        `w-full h-full absolute inset-0 grid place-items-center dropzone`,
                        {'opacity-0': value.length > 0}
                    ]"
                    v-bind="getRootProps()"
                >
                    <div>
                        <input v-bind="getInputProps()"/>
                        <p v-if="isDragActive">Drop the files here ...</p>
                        <div v-else class="text-center">
                            <p>
                                Drag and drop files here
                                <br>or<br>
                                Click to select files
                            </p>
                        </div>
                    </div>
                </div>
                <div v-if="value.length > 0" class="flex justify-center mt-4">
                    <button type="button" class="py-2 px-3 text-b4 rounded-[20px] bg-artboard">
                        <i class="icon-plus-regular me-2"/> Add More Files
                    </button>
                </div>
            </div>
            <app-input-error :error-message="errorMessage"/>
        </div>
    </template>
</template>
