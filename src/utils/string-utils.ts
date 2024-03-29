// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const kebabCase = (str: string) => str && str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("-")

export default {
    kebabCase,
}
