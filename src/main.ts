/**
 * Root entry of the library. Re-exports the public type and constant surface
 * so consumers can do `import type { Option } from "vuetning"` if they prefer
 * the root path over `vuetning/components/types`.
 *
 * Components are NOT exported from here — pick them from their subpath:
 *
 *   import { SldsButton } from "vuetning/components/slds-button"
 *
 * Base styles must be imported separately:
 *
 *   import "vuetning/styles"          // TS entry that imports all SCSS
 *   import "vuetning/style.css"       // pre-built stylesheet
 */
export * from "./constants"
export * from "./components/types"
