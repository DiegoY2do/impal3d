import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderContactForm } from './components/contactform.js';
import { initContactForm } from './components/contact-validation.js';
import { renderPreguntasRapidas } from './components/preguntasrapidas.js';
import { renderSliderDestacados } from './components/SliderDestacados.js';
import { renderSliderOfertas } from './components/SliderOfertas.js';
import { renderSliderVendidos } from './components/SliderVendidos.js';
import { renderInicioHero } from './components/hero-pre.js';
import { renderPromoBanner } from './components/promo-banner.js';
import { renderCarrusel } from './components/carrusel.js';
import { renderResenas, initResenas } from './components/resenas.js';
import { renderNovedades } from './components/novedades.js';
import { renderColecciones, initColecciones } from './components/colecciones.js';
import { renderBrands } from './components/brands.js';
import { renderBenefits } from './components/benefits.js';
import { initAnimaciones } from './animaciones.js';
import { renderCompraxcategoria, initCompraxcategoria } from './components/compraxcategoria.js';
import { renderCuenta } from './components/panelusuario.js';

// Helper: renderiza solo si el contenedor existe en la página
function mount(selector, renderFn, init) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = renderFn();
    if (init) init();
}

// Helper: ejecuta un slider solo si su contenedor existe
function mountSlider(selector, renderFn, categoria) {
    if (!document.querySelector(selector)) return;
    renderFn(selector, categoria);
}

mount('#header', renderNavbar);
mount('#footer', renderFooter);
mount('#contactform', renderContactForm, initContactForm);
mount('#preguntas-rapidas', renderPreguntasRapidas);
mount('#prev', renderInicioHero);
mount('#promo-banner', renderPromoBanner);
mount('#cuenta', renderCuenta);
mount('#brands', renderBrands);
mount('#benefits', renderBenefits);
mount('#carrusel', renderCarrusel);
mount('#novedades', renderNovedades);
mount('#resenas', renderResenas, initResenas);
mount('#colecciones', renderColecciones, initColecciones);

mountSlider('#slider-destacados', renderSliderDestacados, 'destacados');
mountSlider('#slider-ofertas', renderSliderOfertas, 'ofertas');
mountSlider('#slider-vendidos', renderSliderVendidos, 'vendidos');

const compraxcategoria = document.querySelector('#compraxcategoria');

if (compraxcategoria) {
    compraxcategoria.innerHTML = renderCompraxcategoria();
    initCompraxcategoria();
}

// Al final, cuando todo el HTML ya existe
initAnimaciones();