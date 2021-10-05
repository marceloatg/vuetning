export default class DomHandler {

    static addClass(element, className) {
        if (element.classList) element.classList.add(className)
        else element.className += ' ' + className
    }

    static removeClass(element, className) {
        if (element.classList) element.classList.remove(className)
        else element.className = element.className.replace(
            new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
            ' '
        )
    }

    static hasClass(element, className) {
        if (element) {
            if (element.classList) return element.classList.contains(className)
            else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)
        }

        return false
    }
}
