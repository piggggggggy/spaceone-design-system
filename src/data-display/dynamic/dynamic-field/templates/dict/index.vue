<script lang="ts">
import type { DictDynamicFieldProps } from '@/data-display/dynamic/dynamic-field/templates/dict/type';
import PDictList from '@/data-display/dynamic/dynamic-field/templates/list/dict-list/PDictList.vue';
import type { TextOptions } from '@/data-display/dynamic/dynamic-field/type/field-schema';
import PAnchor from '@/inputs/anchors/PAnchor.vue';

export default {
    name: 'PDynamicFieldDict',
    functional: true,
    components: { PDictList, PAnchor },
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
        data: {
            type: [String, Object, Array, Boolean, Number],
            default: undefined,
        },
        typeOptions: {
            type: Object,
            default: () => ({}),
        },
        extraData: {
            type: Object,
            default: () => ({}),
        },
        handler: {
            type: Function,
            default: undefined,
        },
    },
    render(h, { props }: {props: DictDynamicFieldProps}) {
        let dictEl = h(PDictList, {
            props: {
                dict: props.data === undefined || props.data === null ? props.options.default : props.data,
            },
        });

        if (props.options.link) {
            dictEl = h(PAnchor, {
                attrs: { href: (props.options as TextOptions).link, target: '_blank' },
            }, [dictEl]);
        }
        return dictEl;
    },
};
</script>
