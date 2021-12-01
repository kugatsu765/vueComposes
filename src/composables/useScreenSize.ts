import { ref, Ref, computed, ComputedRef } from 'vue';

let sizeMobile = 640;

export function setSizeMobile(size: number) {
    sizeMobile = size;
}

export function useScreenSize(): { width: Ref<number>, height: Ref<number>, isMobile: ComputedRef<boolean> } {

    let width = ref(window.screen.availWidth);
    let height = ref(window.screen.availHeight);

    window.addEventListener('resize', () => {
        width.value = window.screen.availWidth
        height.value = window.screen.availHeight
    })

    const isMobile = computed(() => { return width.value <= sizeMobile })

    return { width, height, isMobile };
}