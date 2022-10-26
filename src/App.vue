<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center p-8">
            <Battlemap />
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu p-4 overflow-y-auto w-[300px] bg-base-300 text-base-content">
                <input type="file" accept="image" @change="uploadImage" name="file" id="file" hidden />
                <label class="hover:bg-secondary-focus border-2 border-secondary-focus rounded-lg font-mono p-2 text-lg flex justify-center cursor-pointer" for="file">Change background</label>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import Battlemap from "./components/Battlemap.vue";
import { bgConfig, width, height } from "./store";

const uploadImage = (e) => {
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
</script>
