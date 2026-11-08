import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initAnimaciones } from './animaciones.js';
import { renderSliderDestacados } from './components/SliderDestacados.js';
import { renderSliderOfertas } from './components/SliderOfertas.js';

const header = document.querySelector('#header');
header.innerHTML = renderNavbar();

renderSliderDestacados('#slider-destacados', 'destacados');
renderSliderOfertas('#slider-ofertas', 'ofertas');

const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();



initAnimaciones();