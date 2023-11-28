export let supportsPassive = false

if (typeof window !== "undefined") {
    supportsPassive = false
    
    try {
        const opts = Object.defineProperty({}, "passive", {
            // eslint-disable-next-line getter-return
            get() {
                supportsPassive = true
            },
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener("test", null, opts)
        // eslint-disable-next-line no-empty
    } catch (e) {
    }
}
