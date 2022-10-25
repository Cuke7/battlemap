<template>
    <div class="w-full h-full bg-base-300 rounded-xl" ref="parent">
        <v-stage ref="stage" :config="configKonva">
            <v-layer ref="layer">
                <v-image :config="bgConfig" />
            </v-layer>
        </v-stage>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { bgConfig } from "../store";

const width = computed(() => {
    return parent.value?.getBoundingClientRect().width;
});
const height = computed(() => {
    return parent.value?.getBoundingClientRect().height;
});
const stage = ref(null);
const parent = ref<HTMLDivElement | null>(null);

const configKonva = computed(() => {
    return {
        width: width.value,
        height: height.value,
        draggable: true,
    };
});

onMounted(() => {
    insertBackground("background.png", 0, 0);
});

const insertBackground = (url: string, x: number, y: number) => {
    const konvasImage = new window.Image();
    konvasImage.src = url;
    konvasImage.onload = () => {
        bgConfig.value = {
            image: konvasImage,
            x: x,
            y: y,
            width: konvasImage.width > konvasImage.height ? width.value : (konvasImage.width / konvasImage.height) * Number(parent.value?.getBoundingClientRect().height),
            height: konvasImage.width <= konvasImage.height ? height.value : (konvasImage.height / konvasImage.width) * Number(parent.value?.getBoundingClientRect().width),
        };
    };
};
</script>
