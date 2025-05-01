import htmlContent from './button.html';
import './button.scss';
import { convertStringToHtmlDivElement, replaceStringFromList } from "../utils/Utils";

export class Button extends HTMLElement {
  static buttonCustomFunction: () => void;
  static get observedAttributes() { return ["message"]; };

  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  connectedCallback() {
    const replaceData: ReplaceData[] = [
      { from: "{message}", to: this.getAttribute("message")! },
    ];

    this.innerHTML = replaceStringFromList(htmlContent, replaceData);
    const btn = document.getElementById('button');
    if (btn) {
      btn.addEventListener('click', () => {
        Button.buttonCustomFunction!();
      });
    }
  }

  renderTemplate = (): HTMLDivElement => {
    return convertStringToHtmlDivElement(htmlContent);
  };
}
