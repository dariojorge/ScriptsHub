export const getId = () => Math.random().toString(36).substring(2);

export const isBlank = (text: string) => !text || /^\s*$/.test(text);
export const isListEmpty = (list: any[]) => !list || list.length <= 0;
export const firstElement = (list: any[]) => list.length > 0 ? list[0] : null;
export const getElementByType = (list: any[], elementName: string) => isListEmpty(list) ? undefined : firstElement(list.filter(element => element.type === elementName));
export const camelToWords = (text: string): string => {
    return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
};
export const wordsToCamel = (text: string): string => {
    return text
        .toLowerCase()
        .split(/[\s-_]+/)
        .map((word, index) =>
            index === 0
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');
};