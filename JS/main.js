import { renderNavbar } from './components/header.js';
import { renderAboutHero } from './components/abouthero.js';
import { renderStatics, initStatics } from './components/statistics.js';
import { renderTimeline } from './components/timeline.js';
import { renderTeam } from './components/team.js';
import { renderCompromiso } from './components/compromiso.js';
import { renderBrands } from './components/brands.js';
import { renderContactForm } from './components/contactform.js';
import { renderPreguntasRapidas} from "./components/preguntasrapidas.js";
import { initContactForm } from './components/contact-validation.js';

const contactform = document.querySelector('#contactform');
import { renderFooter } from './components/footer.js';
import { renderSliderDestacados } from './components/SliderDestacados.js';
import { renderSliderOfertas } from './components/SliderOfertas.js';
import { renderInicioHero } from './components/hero-pre.js';
import { renderCarrusel } from './components/carrusel.js';
import { renderResenas, initResenas } from './components/resenas.js';
import { renderNovedades } from './components/novedades.js';
import { initAnimaciones } from './animaciones.js';

import { renderBenefits } from './components/benefits.js';



if (contactform) {
    contactform.innerHTML = renderContactForm();
    initContactForm();
}

const preguntas = document.querySelector('#preguntas-rapidas');

if (preguntas) {
    preguntas.innerHTML = renderPreguntasRapidas();
}


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

const benefits = document.querySelector('#benefits');
benefits.innerHTML = renderBenefits();

const carrusel = document.querySelector('#carrusel');
carrusel.innerHTML = renderCarrusel();

const novedades = document.querySelector('#novedades');
novedades.innerHTML = renderNovedades();

initAnimaciones();

