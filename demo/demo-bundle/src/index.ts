import './styles.scss';
import { defineCustomElement } from './utils/DefineCustomElement';
import { Header } from './header/header';
import { Body } from './body/body';
import { Footer } from './footer/footer';

defineCustomElement('custom-header', Header);
defineCustomElement('custom-body', Body);
defineCustomElement('custom-footer', Footer);

console.log('Custom elements loaded');