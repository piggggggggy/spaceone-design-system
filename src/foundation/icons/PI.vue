<template>
    <svgicon :name="name"
             :dir="dir"
             :fill="fill"
             :width="width"
             :height="height"
             :scale="scale"
             :color="color"
             :original="original"
             :class="animation"
             v-on="$listeners"
    />
</template>
<script lang="ts">
import '@/foundation/icons/p-icons';
import { defineComponent } from '@vue/composition-api';

import { ANIMATION_TYPE } from '@/foundation/icons/config';
/* https://www.npmjs.com/package/vue-svgicon */
interface Props {
    name: string;
    dir?: string;
    fill?: boolean;
    width: string;
    height: string;
    scale?: string;
    color?: string;
    original?: boolean;
    title?: string;
    animation?: boolean;
}
export default defineComponent<Props>({
    name: 'PI',
    props: {
        name: {
            type: String,
            default: '',
        },
        dir: {
            type: String,
            default: undefined,
        },
        fill: {
            type: Boolean,
            default: true,
        },
        width: {
            type: String,
            default: '1.5rem',
        },
        height: {
            type: String,
            default: '1.5rem',
        },
        scale: {
            type: String,
            default: undefined,
        },
        color: {
            type: String,
            default: undefined,
        },
        original: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: undefined,
        },
        animation: {
            type: String,
            default: undefined,
            validator(animation: any) {
                return animation === undefined || Object.values(ANIMATION_TYPE).includes(animation);
            },
        },
    },
});
</script>

<style lang="postcss">
/**
        Class Prefix is defined in main.js
     */
.p-i-icon {
    display: inline-block;
    color: inherit;
    vertical-align: middle;
    fill: none;
    stroke: currentColor;
    border: 0;
    &.p-i-fill {
        fill: currentColor;
        stroke: none;
    }

    &.p-i-up {
        /* default */
        transform: rotate(0deg);
    }

    &.p-i-right {
        transform: rotate(90deg);
    }

    &.p-i-down {
        transform: rotate(180deg);
    }

    &.p-i-left {
        transform: rotate(-90deg);
    }

    &.spin {
        animation: spin-animation 2s linear infinite;
    }

    @keyframes spin-animation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(359deg);
        }
    }
}
</style>
