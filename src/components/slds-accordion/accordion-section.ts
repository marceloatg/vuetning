/**
 * An accordion section is a single section that’s nested in a slds-accordion component.
 */
export interface AccordionSection {
    /**
     * The content in the accordion section.
     */
    content: string;

    /**
     * Section ID
     */
    id: string

    /**
     * The text that displays as the title of the section.
     */
    label: string;

    /**
     * The unique section name to use with the active-section-name attribute in the accordion component.
     */
    name: string;
}
