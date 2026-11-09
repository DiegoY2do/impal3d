import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderSliderDestacados } from './components/SliderDestacados.js';
import { renderSliderOfertas } from './components/SliderOfertas.js';
import { renderInicioHero } from './components/hero-pre.js';
import { renderResenas, initResenas } from './components/resenas.js';
import { initAnimaciones } from './animaciones.js';

const header = document.querySelector('#header');
header.innerHTML = renderNavbar();

renderSliderDestacados('#slider-destacados', 'destacados');
renderSliderOfertas('#slider-ofertas', 'ofertas');

const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();


const resenas = document.querySelector('#resenas');
resenas.innerHTML = renderResenas();
initResenas();

const prev = document.querySelector('#prev');
prev.innerHTML = renderInicioHero();

initAnimaciones();