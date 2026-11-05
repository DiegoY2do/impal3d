import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderContactForm } from './components/contactform.js';
import { initContactForm } from './components/contact-validation.js';
import { renderPreguntasRapidas } from './components/preguntasrapidas.js';
import { renderUbicacion } from './components/ubicacion.js';
import { initAnimaciones } from './animaciones.js';

const preguntas = document.querySelector('#preguntas-rapidas');
preguntas.innerHTML = renderPreguntasRapidas();

const header = document.querySelector('#header');
header.innerHTML = renderNavbar();

const contactform = document.querySelector('#contactform');

if (contactform) {
    contactform.innerHTML = renderContactForm();
    
    initContactForm();
} 

const ubicacion = document.querySelector('#ubicacion');
ubicacion.innerHTML = renderUbicacion();

const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();

initAnimaciones();