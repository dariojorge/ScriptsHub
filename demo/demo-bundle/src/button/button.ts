import htmlContent from './button.html';
import './button.scss';

export class Button extends HTMLElement {
  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  renderTemplate = (): HTMLDivElement => {

    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = htmlContent;

    return templateWrapper;
  };
}