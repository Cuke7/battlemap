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
import { bgConfig, width, height } from "../store";

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
    if (parent.value?.getBoundingClientRect()) {
        width.value = parent.value.getBoundingClientRect().width;
        height.value = parent.value.getBoundingClientRect().height;
        insertBackground("background.png", 0, 0);
    }
});

const insertBackground = (url: string, x: number, y: number) => {
    const konvasImage = new window.Image();
    konvasImage.src = url;
    konvasImage.onload = () => {
        bgConfig.value = {
            image: konvasImage,
            x: x,
            y: y,
            width: konvasImage.width > konvasImage.height ? width.value : (konvasImage.width / konvasImage.height) * height.value,
            height: konvasImage.width <= konvasImage.height ? height.value : (konvasImage.height / konvasImage.width) * width.value,
        };
    };
};
</script>
