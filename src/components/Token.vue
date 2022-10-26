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
            ctx.arc(data.config.x + data.config.width / 2, data.config.y + data.config.height / 2, data.config.width < data.config.height ? data.config.width / 2 : data.config.height / 2, 0, Math.PI * 2, true);
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
