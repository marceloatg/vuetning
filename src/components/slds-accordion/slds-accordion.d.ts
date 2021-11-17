/**
 * @description A slds-accordion-section component is a single section that’s nested in a slds-accordion component.
 */
export interface AccordionSection {

    /**
     * @description The content in the accordion section.
     * @type {String}
     */
    content: string;

    /**
     * @description The text that displays as the title of the section.
     * @type {String}
     */
    label: string;

    /**
     * @description The unique section name to use with the active-section-name attribute in the accordion component.
     * @type {String}
     */
    name: string;
}
