<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center p-8">
            <Battlemap />
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <div class="p-8 overflow-y-auto w-[400px] bg-base-300 text-base-content space-y-8">
                <!-- BG -->
                <input type="file" accept="image" @change="uploadBg" id="filebg" hidden />
                <label class="hover:bg-secondary-focus border-2 border-secondary-focus rounded-lg font-mono p-2 text-lg flex justify-center cursor-pointer" for="filebg">Change background</label>
                <!-- TOKENS -->
                <div class="flex items-center">
                    <input type="file" accept="image" @change="uploadToken" id="filetoken" hidden />
                    <input type="checkbox" class="toggle" v-model="rounded" />
                    <div class="mx-4">{{ rounded ? "rounded" : "squared" }}</div>
                    <label class="w-full hover:bg-secondary-focus border-2 border-secondary-focus rounded-lg font-mono p-2 text-lg flex justify-center cursor-pointer" for="filetoken">Add token</label>
                </div>
                <div class="flex flex-col">
                    <div class="mb-2">
                        Token size: <span> </span><span class="text-primary font-bold"> {{ tokenWidth }} px</span>
                    </div>
                    <input type="range" min="20" max="200" class="range range-xs" step="20" v-model="tokenWidth" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Battlemap from "./components/Battlemap.vue";
import { bgConfig, width, height, tokens, tokenWidth } from "./store";

const rounded = ref(true);

const uploadBg = (e) => {
    const previewImage = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(previewImage);
    reader.onload = (e) => {
        if (e.target) {
            let src: any = e.target.result;
            // this.previewImageSrc = src;
            const konvasImage = new window.Image();
            konvasImage.src = src;
            konvasImage.onload = () => {
                bgConfig.value = {
                    image: konvasImage,
                    x: 0,
                    y: 0,
                    width: konvasImage.width > konvasImage.height ? width.value : (konvasImage.width / konvasImage.height) * height.value,
                    height: konvasImage.width <= konvasImage.height ? height.value : (konvasImage.height / konvasImage.width) * width.value,
                };
            };
        }
    };
};

const uploadToken = (event) => {
    const previewImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(previewImage);
    reader.onload = (e) => {
        if (e.target) {
            let src: any = e.target.result;
            const konvasImage = new window.Image();
            konvasImage.src = src;
            konvasImage.onload = () => {
                let ratio = konvasImage.height / konvasImage.width;
                let newToken = {
                    data: {
                        config: {
                            image: konvasImage,
                            x: 150,
                            y: 150,
                            width: Number(tokenWidth.value),
                            height: Number(tokenWidth.value * ratio),
                        },
                        rounded: rounded.value,
                        draggable: true,
                    },
                };
                tokens.value.push(newToken);
            };
        }
        event.target.value = "";
    };
};
</script>
