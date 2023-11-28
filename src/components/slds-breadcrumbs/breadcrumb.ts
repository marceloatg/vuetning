/**
 * An item in the hierarchy path of the page the user is on.
 */
export interface Breadcrumb {
    /**
     * The URL of the page that the breadcrumb goes to.
     * Optional, if present the user will be redirected to this URL.
     */
    href?: string

    /**
     * The text label for the breadcrumb.
     */
    label: string

    /**
     * The name for the breadcrumb component.
     * This value is used to identify the breadcrumb in a callback.
     */
    name: string
}
