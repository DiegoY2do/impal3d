import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderInicioHero } from './components/hero-pre.js';
import { initAnimaciones } from './animaciones.js';


const header = document.querySelector('#header');
header.innerHTML = renderNavbar();


const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();

const prev = document.querySelector('#prev');
prev.innerHTML = renderInicioHero();

initAnimaciones();