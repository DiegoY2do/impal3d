import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderPreguntas, initPreguntas } from './components/preguntas.js';

const header = document.querySelector('#header');
const footer = document.querySelector('#footer');
const preguntas = document.querySelector('#preguntas-frecuentes');

if (header) header.innerHTML = renderNavbar();
if (footer) footer.innerHTML = renderFooter();

if (preguntas) {
    preguntas.innerHTML = renderPreguntas();
    initPreguntas();
}