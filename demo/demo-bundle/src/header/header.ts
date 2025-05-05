import htmlContent from './header.html';
import './header.scss';
import {convertStringToHtmlDivElement} from "../utils/Utils";

export class Header extends HTMLElement {
    constructor() {
        super();
        this.appendChild(this.renderTemplate());
    }

    renderTemplate = (): HTMLDivElement => {
        return convertStringToHtmlDivElement(htmlContent);
    };
}