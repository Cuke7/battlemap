<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center p-8">
            <Battlemap />
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu p-4 overflow-y-auto w-[300px] bg-base-300 text-base-content">
                <button class="hover:bg-secondary-focus border-2 border-secondary-focus rounded-lg font-mono p-2 text-lg">Change background</button>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import Battlemap from "./components/Battlemap.vue";
</script>
