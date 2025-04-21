import htmlContent from './card.html';
import './card.scss';

export class Card extends HTMLElement {
  title = 'title';
  body = '';
  footer = '';

  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  renderTemplate = (): HTMLDivElement => {

    let templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = htmlContent;

    let aa = this.stringToDivElement(htmlContent);
    /*this.setDataToElem('.card-title', this.title, templateWrapper);
    this.setDataToElem('.card-body', this.body, templateWrapper);
    this.setDataToElem('.card-footer', this.footer, templateWrapper);*/

    return this.stringToDivElement(htmlContent);
  };

  setDataToElem = (elem: string, data: string, templateWrapper: HTMLDivElement): void => {
    const el = templateWrapper.querySelector(elem);
    if (el) el.textContent = data;
  }

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