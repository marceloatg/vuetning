const validNameRegex = /^([a-zA-Z]+):([a-zA-Z]\w*)$/
const underscoreRegex = /_/g

// Icon name validation
export const isValidName = (iconName) => validNameRegex.test(iconName)

// Icon category and name
const getMatchAtIndex = (index) => (iconName) => {
    const result = validNameRegex.exec(iconName)
    return result ? result[index] : ''
}

const getCategory = getMatchAtIndex(1)
const getName = getMatchAtIndex(2)
export {getCategory, getName}

// Background class
export const computeBackgroundClass = (iconName) => {
    if (!isValidName(iconName)) return ''

    const category = getCategory(iconName)
    const name = getName(iconName).replace(underscoreRegex, '-')
    return `slds-icon-${category}-${name}`
}
