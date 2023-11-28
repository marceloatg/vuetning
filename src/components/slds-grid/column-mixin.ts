import { defineComponent } from "vue"

export default defineComponent({
    props: {
        /**
         * Indicates whether the column has a bottom bump.
         */
        bumpBottom: Boolean,

        /**
         * Indicates whether the column has a left bump.
         */
        bumpLeft: Boolean,

        /**
         * Indicates whether the column has a right bump.
         */
        bumpRight: Boolean,

        /**
         * Indicates whether the column has a top bump.
         */
        bumpTop: Boolean,

        /**
         * Indicates whether the column should hug the content and not grow.
         */
        hug: Boolean,

        /**
         * Indicates whether the column should fill the remaining space.
         */
        fill: Boolean,

        /**
         * The desired size of the column for screens above 96em in width.
         * The values expected are fractions (e.g. 1/3) or percentages (e.g. 33%).
         */
        hugeSize: String,

        /**
         * The desired size of the column.
         * The values expected are fractions (e.g. 1/3) or percentages (e.g. 33%).
         */
        size: String,

        /**
         * The desired size of the column for screens above 120em in width.
         * The values expected are fractions (e.g. 1/3) or percentages (e.g. 33%).
         */
        xHugeSize: String,
    },

    computed: {
        /**
         * The CSS class names for the column.
         */
        columnClassNames(): string {
            let classNames = ""

            // Auto width
            if (this.hug) classNames += " slds-grow-none"
            else if (this.fill) classNames += " slds-shrink-none"

            // Size
            if (this.size) classNames += this.parseSizeClassName(this.size)
            if (this.size && this.hugeSize) classNames += this.parseSizeClassName(this.size, "huge")
            if (this.size && this.xHugeSize) classNames += this.parseSizeClassName(this.size, "x-huge")

            // Bump
            if (this.bumpBottom) classNames += " slds-col_bump-bottom"
            if (this.bumpLeft) classNames += " slds-col_bump-left"
            if (this.bumpRight) classNames += " slds-col_bump-right"
            if (this.bumpTop) classNames += " slds-col_bump-top"

            return classNames
        },
    },

    methods: {
        /**
         * Validates if a given text is a valid percentage.
         * @param input The text input to validate.
         * @returns True if the text is a valid percentage, false otherwise.
         */
        isValidFraction(input: string): boolean {
            return /^\d+\/\d+$/.test(input)
        },

        /**
         * Validates if a given text is a valid fraction.
         * @param input The text input to validate.
         * @return true if the text is a valid fraction, false otherwise.
         */
        isValidPercentage(input: string): boolean {
            return /^\d+(\.\d+)?%$/.test(input)
        },

        /**
         * Returns the parsed CSS class name for the column size.
         * @param input The fraction or percentage to map.
         * @param specification The size specification, in case this size call is used for responsiveness.
         * @returns The CSS class name.
         * @throws {Error} If the input is neither a fraction nor a percentage.
         */
        parseSizeClassName(input: string, specification?: string): string {
            if (specification) specification += "-"
            else specification = ""

            if (this.isValidPercentage(input)) {
                // Convert percentage to fraction
                const fraction = Number(input.replace("%", "")) / 100

                // Simplify fraction
                let numerator = fraction * 100
                let denominator = 100

                while (numerator % 1 !== 0 || denominator % 1 !== 0) {
                    numerator *= 10
                    denominator *= 10
                }

                while (numerator % 2 === 0 && denominator % 2 === 0) {
                    numerator /= 2
                    denominator /= 2
                }

                while (numerator % 3 === 0 && denominator % 3 === 0) {
                    numerator /= 3
                    denominator /= 3
                }

                while (numerator % 5 === 0 && denominator % 5 === 0) {
                    numerator /= 5
                    denominator /= 5
                }

                return ` slds-${specification}size_${numerator}-of-${denominator}`
            }

            if (this.isValidFraction(input)) {
                return ` slds-${specification}size_${input.replace("/", "-of-")}`
            }

            throw new Error(`Invalid input: ${input}\nPlease enter a string containing a fraction (e.g. 1/3) or a percentage (e.g. 33%).`)
        },
    },
})
