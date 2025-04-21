import htmlContent from './body.html';
import './body.scss';
import { CardList } from '../card-list/card-list';
import { Example02 } from '../example02/example02';
import { defineCustomElement } from '../utils/DefineCustomElement';

export class Body extends HTMLElement {
  constructor() {
    super();
    this.appendChild(this.renderTemplate());
    defineCustomElement('custom-card-list', CardList);
    //defineCustomElement('example-02', Example02);
  }

  renderTemplate = (): HTMLDivElement => {
    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = htmlContent;

    return templateWrapper;
  };
}