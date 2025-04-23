import htmlContent from './card-list.html';
import './card-list.scss';
import { Card } from '../card/card';
import { defineCustomElement } from '../utils/DefineCustomElement';
import { convertStringToHtmlDivElement } from '../utils/Utils';

export class CardList extends HTMLElement {
  private cards: TemplateData[] = [
    { id: 0, title: 'Card 1', body: 'This is the first card.', footer: "This is the footer" },
    { id: 1, title: 'Card 2', body: 'Second card details go here.', footer: "This is the footer" },
    { id: 2, title: 'Card 3', body: 'Another description goes here.', footer: "This is the footer" },
  ];

  private customStyle: string = `
  .card {
    background-color: rgb(153, 10, 10);
    border: 1px solidrgb(155, 132, 132);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    font-family: 'Arial', sans-serif;
    transition: box-shadow 0.3s, transform 0.3s;

    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      transform: translateY(-5px);
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 15px;
      color: #333;
    }

    .card-body {
      font-size: 1rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 15px;
    }

    .card-footer {
      text-align: right;
      font-size: 0.9rem;
      color: #888;
      padding-top: 10px;
      border-top: 1px solid #e0e0e0;
    }
  }
  `;

  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  renderTemplate = (): HTMLDivElement => {
    const htmlDivElem = convertStringToHtmlDivElement(htmlContent);
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

    const style = document.createElement("style");
    style.innerHTML = this.customStyle;
    document.head.appendChild(style);
    
    return customCard;
  }
}