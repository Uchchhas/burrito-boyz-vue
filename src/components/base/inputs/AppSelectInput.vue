<script setup>
    import {computed, ref, watch} from 'vue';
    import {useField} from 'vee-validate';
    import {onClickOutside as vOnClickOutside} from '@/directives/clickOutsideDirective';
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

        // Select
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

        modelValue: {},
    });

    // Define emits
    const emit = defineEmits(['update:modelValue', 'onChange']);

    const {value, errorMessage} = useField(() => props.name, undefined, {
        syncVModel: true,
    });

    // Define Data
    const isOpenSelectMenu = ref(false);
    const checkAllItem = ref(false);
    const searchQuery = ref('');

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
    const menuAlignmentClass = computed(() => {
        if (props.menuPosition === 'right') return 'right-0';
    });
    const filteredOptions = computed(() => {
        if (!searchQuery.value.length) return props.options;

        return props.options.filter((item) => {
            return item[props.listValueField].toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1
        });
    });
    const filteredOptionNames = computed(() => {
        const filteredArray = props.options.filter((item) => {
            return props.modelValue.includes(item[props.listTrackBy]);
        });

        return filteredArray.map((item) => item[props.listValueField]).join(", ");
    });

    // Watch effects
    watch(() => isOpenSelectMenu.value, (val) => {
        if (!val) {
            if (props.showSearch) {
                searchQuery.value = '';
            }
        }
    });

    watch(() => props.modelValue, (val) => {
        if (props.multiselect && props.checkAll) {
            checkAllItem.value = val.length === props.options.length;
        }
    });

    // Methods
    const toggleSelectMenu = (e) => {
        const footer = document.querySelector('footer'),
            footerTop = footer?.getBoundingClientRect().top,
            dropdownMenu = selectDropdownRefElement?.value;

        isOpenSelectMenu.value = !isOpenSelectMenu.value;

        if (isOpenSelectMenu.value) {
            nextTick(() => {
                const availableGap = footerTop - e.target.getBoundingClientRect().bottom,
                    dropdownMenuHeight = dropdownMenu?.clientHeight;

                if (dropdownMenuHeight >= availableGap) {
                    selectDropdownMenuPosition.value = 'top';
                } else {
                    selectDropdownMenuPosition.value = 'bottom';
                }
            });
        }
    }

    const closeSelectMenu = (e) => {
        const targetElementId = e.target.getAttribute('id');

        if (targetElementId !== `${props.id}_dropdown_button`) {
            isOpenSelectMenu.value = false;
        }
    }

    const selectDropdownMenuItem = (item) => {
        if (!props.multiselect) {
            emit('update:modelValue', item[props.listTrackBy]);
            toggleSelectMenu();
        }
    }

    const toggleCheckAllItem = () => {
        if (checkAllItem.value) {
            emit('update:modelValue', props.options.map(item => item[props.listTrackBy]));
        } else {
            emit('update:modelValue', []);
        }
    }

    const clearAll = () => {
        emit('update:modelValue', []);
        checkAllItem.value = false;
    }
</script>

<template>
    <div
        :class="formGroupClass"
    >
        <label
            v-if="label"
            :class="[
                    `absolute z-10 left-4 top-[-9px] px-0.5 text-b6 font-semibold text-dark uppercase bg-white`,
                    {'text-error': errorMessage}
                ]">
            {{ label }}
        </label>
        <div class="relative">
            <button
                :id="`${id}_dropdown_button`"
                type="button"
                :class="[
                        `relative whitespace-nowrap text-ellipsis overflow-hidden text-left`,
                        formControlSizeClass,
                        formControlClass,
                        modelValue.length ? 'text-dark' : 'text-placeholder',
                        errorMessage ? 'border-error focus:border-error' : 'border-grey focus:border-grey',
                        {'pr-12': multiselect}
                    ]"
                @click="toggleSelectMenu($event)"
            >
                <template v-if="multiselect">
                    {{ modelValue.length ? filteredOptionNames : placeholder }}
                </template>
                <template v-else>
                    {{
                        modelValue ? filteredOptions.find(option => option[listTrackBy] === modelValue)[listValueField] : placeholder
                    }}
                </template>
                <button
                    v-if="multiselect && modelValue.length"
                    type="button"
                    class="absolute right-9 text-light transition hover:text-action"
                    @click="clearAll"
                >
                    <i class="icon-xmark-regular"/>
                </button>
                <i
                    :class="[`absolute ${inputSize === 'xs-small' ? 'right-[10px]' : 'right-4'} text-light ${dropdownMenuIcon} pointer-events-none`]"
                />
            </button>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <div
                    v-show="isOpenSelectMenu"
                    ref="selectDropdownRefElement"
                    v-on-click-outside="closeSelectMenu"
                    :class="[
                            `w-full min-w-[10rem] absolute ${menuAlignmentClass} py-4 z-50 drop-shadow-md border border-artboard rounded-md bg-white focus:outline-none`,
                            {'bottom-full': selectDropdownMenuPosition === 'top'}
                        ]"
                >
                    <div v-if="props.showSearch"
                         class="px-4 pb-4 mb-2 border-b border-artboard">
                        <input
                            type="text"
                            placeholder="Search"
                            v-model="searchQuery"
                            class="w-full h-8 p-2 border border-grey rounded text-b4 leading-10 placeholder:text-placeholder text-dark focus:ring-transparent focus-visible:outline-none focus:border-primary"
                        />
                    </div>
                    <div class="max-h-[208px] overflow-auto custom-filter-scrollbar">
                        <template v-if="multiselect && checkAll">
                            <button
                                type="button"
                                class="w-full py-2 px-4 flex items-center text-mid text-b4 font-medium transition hover:text-primary hover:bg-artboard"
                            >
                                <input
                                    :id="`${id}_check_all`"
                                    type="checkbox"
                                    v-model="checkAllItem"
                                    @change="toggleCheckAllItem"
                                    class='h-4 w-4 mr-2 cursor-pointer border-2 border-grey rounded-xsm text-orange focus:ring-0 focus:ring-transparent focus-visible:outline-none'
                                />
                                <label :for="`${id}_check_all`">
                                    All
                                </label>
                            </button>
                        </template>
                        <template
                            v-if="filteredOptions.length"
                            v-for="(option, index) in filteredOptions"
                        >
                            <button
                                type="button"
                                class="w-full py-2 px-4 flex items-center text-mid text-b4 font-medium transition hover:text-primary hover:bg-artboard"
                                @click="selectDropdownMenuItem(option)"
                            >
                                <template v-if="multiselect">
                                    <input
                                        :id="option[listTrackBy]"
                                        type="checkbox"
                                        :value="option[listTrackBy]"
                                        v-model="value"
                                        class='h-4 w-4 mr-2 cursor-pointer border-2 border-grey rounded-xsm text-orange focus:ring-0 focus:ring-transparent focus-visible:outline-none'
                                    />
                                    <label :for="option[listTrackBy]">
                                        {{ option[listValueField] }}
                                    </label>
                                </template>
                                <template v-else>
                                    {{ option[listValueField] }}
                                </template>
                            </button>
                        </template>
                        <template v-else>
                            <span
                                class="w-full py-2 px-4 flex items-center justify-center text-mid text-b4 font-medium">
                                No items found
                            </span>
                        </template>
                    </div>
                </div>
            </transition>
        </div>
        <app-input-error :error-message="errorMessage"/>
    </div>
</template>
