import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderInicioHero } from './components/hero-pre.js';
import { renderResenas, initResenas } from './components/resenas.js';
import { initAnimaciones } from './animaciones.js';
import { renderBenefits } from './components/benefits.js';
    

const header = document.querySelector('#header');
header.innerHTML = renderNavbar();


const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();

const resenas = document.querySelector('#resenas');
resenas.innerHTML = renderResenas();
initResenas();

const prev = document.querySelector('#prev');
prev.innerHTML = renderInicioHero();

initAnimaciones();

const benefits = document.querySelector('#benefits');
benefits.innerHTML = renderBenefits();