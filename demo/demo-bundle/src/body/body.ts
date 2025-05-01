import htmlContent from './body.html';
import './body.scss';
import { CardList } from '../card-list/card-list';
import { defineCustomElement } from '../utils/DefineCustomElement';

export class Body extends HTMLElement {
  constructor() {
    super();
    this.appendChild(this.renderTemplate());
    defineCustomElement('custom-card-list', CardList);
  }

  renderTemplate = (): HTMLDivElement => {
    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = htmlContent;

    return templateWrapper;
  };
}