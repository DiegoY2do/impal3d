import {renderNavbar} from './components/header.js';
import { renderAboutHero } from './components/abouthero.js';
import { renderAboutValues } from './components/aboutvalues.js';

const header = document.querySelector('#header');
header.innerHTML=renderNavbar();

const abouthero = document.querySelector('#abouthero');
abouthero.innerHTML=renderAboutHero();

const aboutvalues = document.querySelector('#aboutvalues');
aboutvalues.innerHTML = renderAboutValues();
