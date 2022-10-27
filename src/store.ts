import { ref, computed } from "vue"

interface Token {
    data: {
        config: {
            image: any,
            x: number,
            y: number,
            width: number,
            height: number,
            scale?: {
                x: number, y: number
            }

        },
        ratio: number
        rounded: boolean,
        draggable: boolean,
    }
}

export const bgConfig = ref<any>(null);
export const width = ref(0)
export const height = ref(0)
export const tokensConfig = ref(<Token[]>[])
export const tokens2 = computed(() => {
    const output = <Token[]>[]
    for (const token of tokensConfig.value) {
        token.data.config.scale = {
            x: Number(tokenWidth.value),
            y: Number(tokenWidth.value),
        }
        output.push(token)
    }
    return output
})
export const tokenWidth = ref(1);

