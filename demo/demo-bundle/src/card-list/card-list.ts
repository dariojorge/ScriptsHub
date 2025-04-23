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
    const htmlDivElem = this.stringToDivElement(htmlContent);
    this.cards.forEach(card => {
      const cardName = 'custom-card-' + card.id;
      const cardEl = this.createCard(card, cardName);
      defineCustomElement(cardName, class extends Card { });
      htmlDivElem!.appendChild(cardEl);
    });

    return htmlDivElem;
  };

  createCard = (card: TemplateData, cardElemName: string): HTMLElement => {
    const customCard = document.createElement(cardElemName) as Card;
    customCard.setAttribute("title", card.title);
    customCard.setAttribute("body", card.body);
    customCard.setAttribute("footer", card.footer);
    return customCard;
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