export const textCapitalize = (text) => {
    return text.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}
