<template>
    <p-status class="p-select-status" :class="{selected: isSelected, 'with-icon': withIcon}"
              :icon="icon || (isSelected && !disableCheckIcon ? 'ic_check' : undefined)"
              :icon-color="icon ? undefined : 'inherit'"
              :icon-animation="iconAnimation"
              :lottie="lottie"
              :disable-icon="!withIcon && (!isSelected || disableCheckIcon)"
              @click="onClick"
    >
        <slot>{{ value }}</slot>
    </p-status>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import PStatus from '@/data-display/status/PStatus.vue';
import { ANIMATION_TYPE } from '@/foundation/icons/config';
import type { SelectProps } from '@/hooks/select';
import { useSelect } from '@/hooks/select';

interface Props extends SelectProps {
    icon?: string;
    lottie?: string;
    iconAnimation?: ANIMATION_TYPE;
    disableCheckIcon?: boolean;
}

export default defineComponent<Props>({
    name: 'PSelectStatus',
    components: { PStatus },
    model: {
        prop: 'selected',
        event: 'change',
    },
    props: {
        /* select props */
        selected: {
            type: [Boolean, String, Number, Object, Array],
            default: undefined,
        },
        value: {
            type: [Boolean, String, Number, Object, Array],
            default: '',
        },
        predicate: {
            type: Function,
            default: undefined,
        },
        multiSelectable: {
            type: Boolean,
            default: false,
        },
        /* status props */
        icon: {
            type: String,
            default: undefined,
        },
        lottie: {
            type: String,
            default: undefined,
        },
        iconAnimation: {
            type: String,
            default: undefined,
            validator(animation: any) {
                return animation === undefined || Object.values(ANIMATION_TYPE).includes(animation);
            },
        },
        disableCheckIcon: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: Props, { emit }) {
        const {
            isSelected,
            getSelected,
        } = useSelect({
            value: computed(() => props.value),
            selected: computed(() => props.selected),
            predicate: computed(() => props.predicate),
            multiSelectable: computed(() => props.multiSelectable),
        });
        const withIcon = computed(() => props.icon || props.lottie);

        /* event */
        const onClick = () => {
            const newSelected = getSelected();
            if (props.multiSelectable) {
                emit('change', newSelected, !isSelected.value);
            } else {
                emit('change', newSelected, true);
            }
        };

        return {
            isSelected,
            withIcon,
            onClick,
        };
    },
});
</script>

<style lang="postcss">
.p-select-status {
    &.p-status {
        @apply text-gray-700;
        cursor: pointer;

        .text {
            margin-left: 0;
            font-size: 0.875rem;
        }

        &.with-icon {
            .text {
                margin-left: 0.25rem;
            }
        }

        &:hover:not(.selected) {
            @apply text-gray-900;
        }

        &.selected {
            @apply text-secondary;
        }
    }
}
</style>
