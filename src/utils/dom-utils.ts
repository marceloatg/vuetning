const addClass = (element: Element, className: string) => {
    if (element.classList) element.classList.add(className)
    else element.className += " " + className
}

const removeClass = (element: Element, className: string) => {
    if (element.classList) element.classList.remove(className)
    else element.className = element.className.replace(
        new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
        " ",
    )
}

const hasClass = (element: Element, className: string) => {
    if (element) {
        if (element.classList) return element.classList.contains(className)
        else return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className)
    }

    return false
}

export default {
    addClass,
    removeClass,
    hasClass,
}
