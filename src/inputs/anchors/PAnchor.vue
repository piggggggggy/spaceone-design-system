<template>
    <router-link :to="to || {}" class="p-anchor" custom>
        <template #default="{href: toHref, navigate}">
            <span>
                <a ref="anchorRef" class="p-anchor"
                   :class="{disabled, highlight, [size]: true}"
                   :target="validateTarget()"
                   :href="to ? (toHref || href ): href"
                   @click.stop="navigate"
                >
                    <p-i v-if="iconVisible && hasText && iconPosition === IconPosition.left"
                         :name="iconName"
                         height="1.1em" width="1.1em"
                         color="inherit"
                         class="icon"
                    />
                    <span class="text">
                        <slot v-bind="{...$props}">
                            {{ text }}
                        </slot>
                    </span>
                    <p-i v-if="iconVisible && hasText && iconPosition === IconPosition.right"
                         :name="iconName"
                         height="1.1em" width="1.1em"
                         color="inherit"
                         class="icon"
                    />
                </a>
            </span>
        </template>
    </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';

import type { Location } from 'vue-router';

import PI from '@/foundation/icons/PI.vue';
import { AnchorSize, IconPosition } from '@/inputs/anchors/type';


interface Props {
  text?: string;
  size?: AnchorSize;
  iconPosition?: IconPosition;
  iconVisible?: boolean;
  iconName?: string;
  href?: string;
  to?: Location;
  disabled?: boolean;
  highlight?: boolean;
}

export default defineComponent<Props>({
    name: 'PAnchor',
    components: {
        PI,
    },
    props: {
        text: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: AnchorSize.md,
            validator(type: AnchorSize) {
                return Object.values(AnchorSize).includes(type);
            },
        },
        iconPosition: {
            type: String,
            default: IconPosition.right,
            validator(type: IconPosition) {
                return Object.values(IconPosition).includes(type);
            },
        },
        iconVisible: {
            type: Boolean,
            default: true,
        },
        iconName: {
            type: String,
            default: 'ic_external-link',
        },
        href: {
            type: String,
            default: undefined,
        },
        to: {
            type: Object,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        highlight: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: Props) {
        const validateTarget = () => {
            const {
                disabled, iconName, iconVisible,
            } = props;
            if (disabled) return '_self';
            if (iconName === 'ic_external-link' && iconVisible) return '_blank';
            return '_self';
        };
        const anchorRef = ref<HTMLElement|null>(null);
        const hasText = computed(() => !!anchorRef.value?.textContent);
        return {
            validateTarget,
            anchorRef,
            hasText,
            IconPosition,
        };
    },
});
</script>

<style lang="postcss">
.p-anchor {
    /* Do not change this to inline-flex style, because it must be used with inline texts. */
    @apply cursor-pointer inline-block items-end;
    font-size: inherit;
    vertical-align: baseline;
    line-height: 1.25;
    > .text {
        font-weight: inherit;
        font-size: inherit;
        color: inherit;
        word-break: break-all;
        vertical-align: baseline;
    }
    > .icon {
        margin: 0 0.125em;
        vertical-align: top;
    }
    &.disabled {
        @apply text-gray-400;
        cursor: not-allowed;
        &.highlight {
            @apply text-blue-300;
        }
    }
    &:not(.disabled).highlight {
        @apply text-blue-700;
        &:active {
            @apply text-blue-700;
        }

        @media (hover: hover) {
            &:hover {
                @apply text-blue-800;
            }
        }
    }

    &.sm {
        font-size: 0.75rem;
        .icon {
            margin-bottom: 0.125rem;
        }
    }
    &.lg {
        font-size: 1rem;
        .icon {
            margin-bottom: unset;
        }
    }

    @media (hover: hover) {
        &:not(.disabled):hover {
            > .text {
                @apply underline;
            }
        }
    }

    &:not(.disabled) {
        &:focus, &:active, &focus-within {
            > .text {
                @apply underline;
            }
        }
    }
}
</style>
