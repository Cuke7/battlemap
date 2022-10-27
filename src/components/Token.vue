<template>
    <v-group :config="data.rounded ? groupConfigRounded : groupConfigNotRounded">
        <v-image :config="data.config"></v-image>
    </v-group>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["data"]);
const data = props.data;

const groupConfigRounded = computed(() => {
    return {
        clipFunc: (ctx) => {
            ctx.arc(data.config.x + (data.config.width * data.config.scale.x) / 2, data.config.y + (data.config.height * data.config.scale.y) / 2, data.config.width * data.config.scale.x < data.config.height * data.config.scale.y ? (data.config.width * data.config.scale.x) / 2 : (data.config.height * data.config.scale.y) / 2, 0, Math.PI * 2, true);
        },
        draggable: data.draggable,
    };
});

const groupConfigNotRounded = computed(() => {
    return {
        draggable: data.draggable,
    };
});
</script>
