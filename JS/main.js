import {renderNavbar} from './components/header.js';
import { renderAboutHero } from './components/abouthero.js';

const header = document.querySelector('#header');
header.innerHTML=renderNavbar();

const abouthero = document.querySelector('#abouthero');
abouthero.innerHTML=renderAboutHero();
