import htmlContent from './card.html';
import { convertStringToHtmlDivElement, replaceStringFromList } from '../utils/Utils';
import './card.scss';



export class Card extends HTMLElement {
  static get observedAttributes() { return ["title", "body", "footer"]; };

  constructor() {
    super();
    this.appendChild(this.renderTemplate());
  }

  connectedCallback() {
    const replaceData: ReplaceData[] = [
      { from: "{title}", to: this.getAttribute("title")! },
      { from: "{body}", to: this.getAttribute("body")! },
      { from: "{footer}", to: this.getAttribute("footer")! },
      {
        from: "{style}", to: `
        <style>
        $card-bg-color:rgb(153, 10, 10);
        $card-border-color: #e0e0e0;
        $card-shadow-color: rgba(0, 0, 0, 0.1);
        $card-hover-shadow-color: rgba(0, 0, 0, 0.2);
        $border-radius: 12px;
        $padding: 20px;
        $transition-speed: 0.3s;
        $font-family: 'Arial', sans-serif;

        .card {
          background-color: $card-bg-color;
          border: 1px solid $card-border-color;
          border-radius: $border-radius;
          box-shadow: 0 4px 8px $card-shadow-color;
          padding: $padding;
          font-family: $font-family;
          transition: box-shadow $transition-speed, transform $transition-speed;

          &:hover {
            box-shadow: 0 8px 16px $card-hover-shadow-color;
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
            border-top: 1px solid $card-border-color;
          }
        }
        </style>
        ` }
    ];
    this.innerHTML = replaceStringFromList(htmlContent, replaceData);
  }

  renderTemplate = (): HTMLDivElement => {
    return convertStringToHtmlDivElement(htmlContent);
  };
}
