import htmlContent from './card.html';
import './card.scss';

export class Card extends HTMLElement {
  static get observedAttributes() { return ["title", "body", "footer"]; }

  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  connectedCallBack() {
    this.innerHTML = htmlContent.replace("{title}", this.getAttribute("title")!.toString())
      .replace("{body}", this.getAttribute("body")!.toString())
      .replace("{footer}", this.getAttribute("footer")!.toString())
  }

  renderTemplate = (): HTMLDivElement => {
    return this.stringToDivElement(htmlContent);
  };

  stringToDivElement = (htmlString: string): HTMLDivElement => {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();

    const element = template.content.firstElementChild;

    if (element instanceof HTMLDivElement) {
      return element;
    } else {
      throw new Error('Provided string does not represent a <div> element.');
    }
  }
}