import { renderSidebar, activarSidebar } from './components/panel/sidebar.js';
import { montarTopbar } from './components/panel/topbar.js';
import { montarProductosLista } from './components/panel/productos-lista.js';
import { montarProductoForm } from './components/panel/producto-form.js';
import { montarProximamente } from './components/panel/proximamente.js';
import { esc } from './components/panel/util.js';
import { iniciarRouter } from './panel-router.js';

const contenido = document.querySelector('#panel-contenido');

// La barra lateral se arma una sola vez; solo cambia lo que hay en #panel-contenido
document.querySelector('#panel-sidebar').innerHTML = renderSidebar();

iniciarRouter([
    { patron: /^\/productos\/?$/, clave: 'productos', vista: (m, vigente) => montarProductosLista(contenido, vigente) },
    { patron: /^\/productos\/nuevo$/, clave: 'productos', vista: (m, vigente) => montarProductoForm(contenido, null, vigente) },
    { patron: /^\/productos\/(\d+)$/, clave: 'productos', vista: (m, vigente) => montarProductoForm(contenido, Number(m[1]), vigente) },
    { patron: /^\/([a-z-]+)$/, clave: (m) => m[1], vista: (m) => montarProximamente(contenido, m[1]) }
], {
    alCambiar: activarSidebar,
    alError: (err) => {
        montarTopbar({ titulo: 'Algo salió mal' });
        contenido.innerHTML = `
            <section class="pn-card">
                <h2>No pude cargar esta pantalla</h2>
                <p class="pn-hint">${esc(err.message)}</p>
                <p><a href="#/productos">Volver a productos</a></p>
            </section>`;
    }
});

// Menú en móvil
document.addEventListener('click', (e) => {
    if (e.target.closest('.panel-burger')) document.body.classList.toggle('panel--menu');
    else if (e.target.closest('.panel-backdrop') || e.target.closest('.pn-nav__link')) document.body.classList.remove('panel--menu');
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('panel--menu');
});