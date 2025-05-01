import htmlContent from './image.html';
import './image.scss';
import { convertStringToHtmlDivElement } from "../utils/Utils";
import { defineCustomElement } from "../utils/DefineCustomElement";
import { Button } from "../button/button"

export class Image extends HTMLElement {
    constructor() {
        super();
        this.appendChild(this.renderTemplate());
        defineCustomElement('custom-button', Button);
        const myEl = Button;
        myEl.buttonCustomFunction = () => {
            this.changeElemDisplay("image1");
            this.changeElemDisplay("image2");
        }

    }

    changeElemDisplay = (elem: string) => {
        const div = this.getHtmlElement(document.getElementsByClassName(elem));
        if (!div) {
            return;
        }

        if (getComputedStyle(div).display.includes("none")) {
            div.classList.add('is-visible');
            div.classList.remove('is-hidden');
            return;
        }

        div.classList.add('is-hidden');
        div.classList.remove('is-visible');
    }

    getHtmlElement = (elements: HTMLCollectionOf<Element>): HTMLElement | null => {
        if (elements.length > 0) {
            return elements[0] as HTMLElement;
        }
        return null;
    }

    renderTemplate = (): HTMLDivElement => {
        return convertStringToHtmlDivElement(htmlContent);
    };
}
