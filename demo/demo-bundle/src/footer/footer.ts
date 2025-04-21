import htmlContent from './footer.html';
import './footer.scss';

export class Footer extends HTMLElement {
  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  renderTemplate = (): HTMLDivElement => {

    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = htmlContent;
    
    this.setDataToElem('.footer', "&copy; 2025 My company", templateWrapper);

    return templateWrapper;
  };

  setDataToElem = (elem: string, data: string, templateWrapper: HTMLDivElement): void => {
    const el = templateWrapper.querySelector(elem);
    if (el) el.textContent = data;
  }
}