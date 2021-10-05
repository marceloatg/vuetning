export let supportsPassive = false

if (typeof window !== 'undefined') {
  supportsPassive = false
  try {
    let opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get () {
        supportsPassive = true
      },
    })
    window.addEventListener('test', null, opts)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}
