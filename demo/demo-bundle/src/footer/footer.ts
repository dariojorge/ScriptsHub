import htmlContent from './footer.html';
import './footer.scss';
import {convertStringToHtmlDivElement} from "../utils/Utils";

export class Footer extends HTMLElement {
    constructor() {
        super();
        this.appendChild(this.renderTemplate());
    }

    renderTemplate = (): HTMLDivElement => {
        return convertStringToHtmlDivElement(htmlContent);
    };
}