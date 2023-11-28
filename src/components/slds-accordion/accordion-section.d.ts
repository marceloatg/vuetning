/**
 * A accordion section is a single section that’s nested in a slds-accordion component.
 */
export interface AccordionSection {

    /**
     * The content in the accordion section.
     * @type {String}
     */
    content: string;

    /**
     * The text that displays as the title of the section.
     * @type {String}
     */
    label: string;

    /**
     * The unique section name to use with the active-section-name attribute in the accordion component.
     * @type {String}
     */
    name: string;
}
