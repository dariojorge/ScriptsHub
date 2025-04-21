import htmlContent from './header.html';
import './header.scss';

export class Header extends HTMLElement {
  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  renderTemplate = (): HTMLDivElement => {

    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = htmlContent;
    
    this.setDataToElem('.page-title', "Title of the Page.", templateWrapper);

    return templateWrapper;
  };

  setDataToElem = (elem: string, data: string, templateWrapper: HTMLDivElement): void => {
    const el = templateWrapper.querySelector(elem);
    if (el) el.textContent = data;
  }
}