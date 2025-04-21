import htmlContent from './card-list.html';
import './card-list.scss';
import { Card } from '../card/card';
import { defineCustomElement } from '../utils/DefineCustomElement';

export class CardList extends HTMLElement {
  private cards = [
    { id: 0, title: 'Card 1', body: 'This is the first card.', footer: "This is the footer" },
    { id: 1, title: 'Card 2', body: 'Second card details go here.', footer: "This is the footer" },
    { id: 2, title: 'Card 3', body: 'Another description goes here.', footer: "This is the footer" },
  ];

  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  renderTemplate = (): HTMLDivElement => {

    //let templateWrapper = document.createElement('div');
    //templateWrapper.innerHTML = htmlContent;
    const htmlDivElem = this.stringToDivElement(htmlContent);

    //const cardListContainer = document.getElementById('card-list');
    this.cards.forEach(card => {
      //const newCard = new Card(card);
      const cardEl = this.createCard(card);//document.createElement('custom-card');
      console.log('custom-card-' + card.id);
      //console.log(this.createCard(card));
      defineCustomElement('custom-card', Card);
      /*cardEl.classList.add('card');
      this.setDataToElem('.card-title', this.data.title, cardEl);
      this.setDataToElem('.card-body', this.data.body, cardEl);
      this.setDataToElem('.card-footer', this.data.footer, cardEl);*/
      htmlDivElem!.appendChild(cardEl);
    });
    
    return htmlDivElem;
  };

  createCard = (card: TemplateData): HTMLElement => {
    const customCard = document.createElement('custom-card') as Card;
    //customCard.renderTemplate(card);
    console.log(customCard.title);
    // = card.title;
    customCard.body = card.body;
    customCard.footer = card.footer;
    return customCard;
  }

  setDataToElem = (elem: string, data: string, templateWrapper: HTMLDivElement): void => {
    const el = templateWrapper.querySelector(elem);
    if (el) el.textContent = data;
  }

  stringToDivElement = (htmlString: string) => {
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