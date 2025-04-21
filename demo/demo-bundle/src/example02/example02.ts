import htmlContent from './example02.html';
import './example02.scss';

export class Example02 extends HTMLElement {
  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  renderTemplate = (): HTMLDivElement => {

    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = htmlContent;
    
    //const buttonEl = templateWrapper.querySelector('#button');

    //i//f (buttonEl) buttonEl.textContent = "Click me Now!";
    //this.setDataToElem('', '', templateWrapper);

    return templateWrapper;
  };

  setDataToElem = (elem: string, data: string, templateWrapper: HTMLDivElement): void => {
    const el = templateWrapper.querySelector(elem);
    if (el) el.textContent = data;
  }
}