const validNameRegex = /^([a-zA-Z]+):([a-zA-Z]\w*)$/
const underscoreRegex = /_/g

// Icon name validation
const isValidName = (iconName: string) => validNameRegex.test(iconName)

// Icon category and name
const getMatchAtIndex = (index: number) => (iconName: string) => {
    const result = validNameRegex.exec(iconName)
    return result ? result[index] : ""
}

const getCategory = getMatchAtIndex(1)
const getName = getMatchAtIndex(2)

// Background class
const computeBackgroundClass = (iconName: string) => {
    if (!isValidName(iconName)) return ""

    const category = getCategory(iconName)
    const name = getName(iconName).replace(underscoreRegex, "-")
    return `slds-icon-${category}-${name}`
}

export default {
    computeBackgroundClass,
    getCategory,
    getName,
    isValidName,
}
