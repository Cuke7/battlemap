<template>
    <div class="w-full h-full bg-base-300 rounded-xl" ref="parent">
        <v-stage ref="stageEl" :config="configKonva" @wheel="wheel">
            <v-layer ref="layer">
                <v-image :config="bgConfig" />
                <Token v-for="token in tokens2" :data="token.data" />
            </v-layer>
        </v-stage>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { bgConfig, width, height, tokens2 } from "../store";
import Token from "./Token.vue";

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

const scaleBy = ref(1.1);
const stageEl = ref<any>(null);
const wheel = (e) => {
    if (stageEl.value) {
        let stage = stageEl.value.getStage();
        e.evt.preventDefault();
        var oldScale = stage.scaleX();

        var pointer = stage.getPointerPosition();

        var mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        var newScale = e.evt.deltaY < 0 ? oldScale * scaleBy.value : oldScale / scaleBy.value;

        stage.scale({ x: newScale, y: newScale });

        var newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
    }
};
</script>
