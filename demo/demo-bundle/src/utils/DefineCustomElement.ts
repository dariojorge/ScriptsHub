export const defineCustomElement = (name: string, elementClass: CustomElementConstructor) => {
    const tag = name;
    const globalKey = `__defined_${tag}`;

    if (!(window as any)[globalKey]) {
        customElements.define(tag, elementClass);
        (window as any)[globalKey] = true;
    }
}