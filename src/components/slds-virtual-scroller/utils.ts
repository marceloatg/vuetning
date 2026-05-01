export let supportsPassive = false

if (typeof window !== "undefined") {
    supportsPassive = false
    
    try {
        const opts = Object.defineProperty({}, "passive", {
             
            get() {
                supportsPassive = true
            },
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener("test", null, opts)
    } catch {
        // Feature-detection probe failure is expected when passive is unsupported.
    }
}
