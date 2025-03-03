<template>
    <div class="p-dynamic-layout-markdown">
        <p-panel-top v-if="layoutName">
            {{ layoutName }}
        </p-panel-top>
        <p-markdown :markdown="options.markdown || ''"
                    :data="rootData"
                    :language="language"
        />
    </div>
</template>

<script lang="ts">
import type { ComponentRenderProxy } from '@vue/composition-api';
import {
    computed, getCurrentInstance,
    reactive, toRefs,
} from '@vue/composition-api';

import type {
    MarkdownDynamicLayoutProps,
} from '@/data-display/dynamic/dynamic-layout/templates/markdown/type';
import { getValueByPath } from '@/data-display/dynamic/helper';
import PMarkdown from '@/data-display/markdown/PMarkdown.vue';
import PPanelTop from '@/data-display/titles/panel-top/PPanelTop.vue';


export default {
    name: 'PDynamicLayoutMarkdown',
    components: {
        PPanelTop, PMarkdown,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Object,
            default: () => ({}),
        },
        data: {
            type: [Object, Array, String],
            default: undefined,
        },
        fetchOptions: {
            type: Object,
            default: undefined,
        },
        typeOptions: {
            type: Object,
            default: undefined,
        },
    },
    setup(props: MarkdownDynamicLayoutProps) {
        const vm = getCurrentInstance()?.proxy as ComponentRenderProxy;
        const state = reactive({
            layoutName: computed(() => (props.options.translation_id ? vm.$t(props.options.translation_id) : props.name)),
            rootData: computed<any[]>(() => {
                if (props.options.root_path) {
                    return getValueByPath(props.data, props.options.root_path);
                }
                return props.data;
            }),
            language: computed(() => props.typeOptions?.language || 'en'),
        });

        return {
            ...toRefs(state),
        };
    },
};
</script>
