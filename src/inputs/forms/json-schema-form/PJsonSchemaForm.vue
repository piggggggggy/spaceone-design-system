<template>
    <vue-form-json-schema
        v-model="proxyModel"
        class="p-json-schema-form"
        :schema="schema"
        :ui-schema="uiSchema"
        :options="options"
        :components="customComponents"
        @change="onChangeModel"
        @validated="onValidated"
    />
</template>

<script lang="ts">
import {
    computed, reactive, toRefs, watch,
} from '@vue/composition-api';

import { flatMap, sortBy } from 'lodash';
import VueFormJsonSchema from 'vue-form-json-schema/dist/vue-form-json-schema.esm';


import PFieldGroup from '@/inputs/forms/field-group/PFieldGroup.vue';
import { getFormUiSchema, getDefaultInputValue } from '@/inputs/forms/json-schema-form/helper';
import type {
    JsonSchema, JsonSchemaFormProps, UiSchema,
} from '@/inputs/forms/json-schema-form/type';
import PTextInput from '@/inputs/input/PTextInput.vue';
import { makeProxy } from '@/util/composition-helpers';


export default {
    name: 'PJsonSchemaForm',
    components: {
        VueFormJsonSchema,
    },
    props: {
        model: {
            type: Object,
            required: true,
        },
        schema: {
            type: Object,
            required: true,
        },
        isValid: {
            type: Boolean,
            default: false,
        },
        showValidationErrors: {
            type: Boolean,
            default: true,
        },
    },
    setup(props: JsonSchemaFormProps, { emit }) {
        const state = reactive({
            proxyModel: makeProxy('model', props, emit),
            uiSchema: [] as UiSchema[],
            options: computed(() => ({
                castToSchemaType: true,
                showValidationErrors: props.showValidationErrors,
            })),
            customComponents: {
                'p-field-group': PFieldGroup,
                'p-text-input': PTextInput,
            },
        });

        /* util */
        const setDefaultInputModel = (schema: JsonSchema) => {
            const defaultInputModel = getDefaultInputValue(schema);
            emit('update:model', defaultInputModel);
        };
        const generateUiSchema = (schema: JsonSchema) => {
            const formUiSchema = getFormUiSchema(schema);
            const sortedFormUiSchema = sortBy(formUiSchema, (d: any) => d.input?.fieldOptions?.props?.label);
            state.uiSchema = sortedFormUiSchema.map(d => ({
                component: 'div',
                fieldOptions: {
                    class: 'json-schema-field-group',
                },
                children: flatMap(d) as UiSchema[],
            }));
        };

        /* event */
        const onValidated = (isValid) => {
            emit('update:isValid', isValid);
        };
        const onChangeModel = (model) => {
            Object.entries(model).forEach(([key, value]) => {
                const isRequired = !!(props.schema.required?.includes(key));
                if (!isRequired && !value) {
                    const newModel = { ...model };
                    newModel[key] = undefined;
                    emit('update:model', newModel);
                }
            });
        };

        watch(() => props.schema, async (schema) => {
            if (schema && schema.properties) {
                if (!props.model || Object.values(props.model).every(d => d === undefined)) {
                    setDefaultInputModel(schema);
                }
                generateUiSchema(schema);
            }
        }, { immediate: true });

        return {
            ...toRefs(state),
            onValidated,
            onChangeModel,
        };
    },
};
</script>

<style lang="postcss">
.p-json-schema-form {
    .json-schema-field-group {
        margin-bottom: 1rem;

        .p-field-group {
            margin-bottom: 0;
            .p-text-input {
                width: 100%;
                &.invalid {
                    .input-container {
                        @apply border-alert;
                    }
                }
            }
        }

        .error-text {
            @apply text-red-500;
            font-size: 0.75rem;
            line-height: 0.875rem;
            font-weight: 400;
            background-image: none;
            padding-left: 0;
            margin-top: 0.25rem;
        }
    }
}
</style>
