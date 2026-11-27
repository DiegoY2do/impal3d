import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderResenasProducto, initResenasProducto } from './components/resenasProducto.js';
import { initAnimaciones } from './animaciones.js';

// Helper: renderiza solo si el contenedor existe en la página
function mount(selector, renderFn, init) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = renderFn();
    if (init) init();
}

mount('#header', renderNavbar);
mount('#footer', renderFooter);
mount('#resenas', renderResenasProducto, initResenasProducto);

// Al final, cuando todo el HTML ya existe
initAnimaciones();