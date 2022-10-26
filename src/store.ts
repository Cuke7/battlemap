import { ref } from "vue"

interface Token {
    data: {
        config: {
            image: any,
            x: number,
            y: number,
            width: number,
            height: number,
        },
        rounded: boolean,
        draggable: boolean,
    }
}

export const bgConfig = ref<any>(null);
export const width = ref(0)
export const height = ref(0)
export const tokens = ref<Token[]>([])
