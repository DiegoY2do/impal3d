import { cargarProductos } from './productos.js';
import { renderCard } from './cards.js';

const iconoPrev = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`;
const iconoNext = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

/* ----------------------------------------------------------
   FILTRO POR CATEGORÍA
   ---------------------------------------------------------- */

// Quita acentos y mayúsculas para comparar ("Decoración" = "decoracion")
const normalizar = (texto = '') =>
    String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Pestañas tomadas del JSON: el producto debe tener EXACTAMENTE esa categoría
const coincideExacto = (producto, categoria) =>
    normalizar(producto.categoria) === normalizar(categoria);

// Pestañas personalizadas (opción "categorias"): basta con que la contenga,
// así la pestaña "Figuras" incluye "Figuras articuladas".
const coincideParcial = (producto, categoria) =>
    normalizar(producto.categoria).includes(normalizar(categoria));

// Evita que un texto rompa el HTML (comillas, <, &)
const escapar = (texto) => String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/* ----------------------------------------------------------
   PLANTILLA
   ---------------------------------------------------------- */

// Recibe los productos, las pestañas y los textos, y devuelve el HTML
function plantilla(productos, categorias, { titulo, subtitulo }) {
    // Solo hay pestañas si al menos una categoría tiene productos
    const tabs = categorias.length
        ? `<div class="vendidos-tabs" role="tablist" aria-label="Categorías">
               <button class="vendidos-tab activa" type="button" role="tab" aria-selected="true" data-categoria="">Todos</button>
               ${categorias.map((c) => `<button class="vendidos-tab" type="button" role="tab" aria-selected="false" data-categoria="${escapar(c)}">${escapar(c)}</button>`).join('')}
           </div>`
        : '';

    return `
    <section class="slider-vendidos">
        <div class="container-max">

            <!-- Encabezado: fuera del panel gris -->
            <div class="vendidos-header">
                <div class="vendidos-text">
                    <h2>${titulo}</h2>
                    <p>${subtitulo}</p>
                </div>

                <div class="vendidos-controles">
                    ${tabs}
                    <div class="vendidos-flechas">
                        <button class="vendidos-flecha vendidos-flecha-prev" type="button" aria-label="Anterior">${iconoPrev}</button>
                        <button class="vendidos-flecha vendidos-flecha-next" type="button" aria-label="Siguiente">${iconoNext}</button>
                    </div>
                </div>
            </div>

            <!-- Panel gris: solo las cards (se vuelven a pintar al cambiar de pestaña) -->
            <div class="container-vendidos">
                <div class="vendidos-track">
                    ${productos.map(renderCard).join('')}
                </div>
            </div>

        </div>
    </section>
    `;
}

/* ----------------------------------------------------------
   COMPORTAMIENTO: pestañas + flechas
   Se ejecuta DESPUÉS de pintar el HTML.
   ---------------------------------------------------------- */
function initSlider(contenedor, productos, coincide) {
    const track = contenedor.querySelector('.vendidos-track');
    const prev = contenedor.querySelector('.vendidos-flecha-prev');
    const next = contenedor.querySelector('.vendidos-flecha-next');
    const tabs = contenedor.querySelectorAll('.vendidos-tab');

    // Cuánto se desplaza por clic: una card + el espacio entre cards.
    // La card se busca en cada clic porque al cambiar de pestaña se reemplazan.
    const paso = () => {
        const card = track.querySelector('.card');
        if (!card) return 0;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return card.offsetWidth + gap;
    };

    // Desactiva la flecha izquierda al inicio y la derecha al final
    const actualizarFlechas = () => {
        const max = track.scrollWidth - track.clientWidth;
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft >= max - 1;
    };

    prev.addEventListener('click', () => track.scrollBy({ left: -paso(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: paso(), behavior: 'smooth' }));
    track.addEventListener('scroll', actualizarFlechas);
    window.addEventListener('resize', actualizarFlechas);

    // Clic en una pestaña: filtra, vuelve al inicio y marca la pestaña activa
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const categoria = tab.dataset.categoria;
            const lista = categoria
                ? productos.filter((p) => coincide(p, categoria))
                : productos;

            track.innerHTML = lista.map(renderCard).join('');
            track.scrollLeft = 0;

            tabs.forEach((t) => {
                const activa = t === tab;
                t.classList.toggle('activa', activa);
                t.setAttribute('aria-selected', activa);
            });

            actualizarFlechas();
        });
    });

    actualizarFlechas();
}

/* ----------------------------------------------------------
   FUNCIÓN PÚBLICA (la que llama main.js)
     selector -> dónde se pinta (ej: '#slider-vendidos')
     tag      -> qué productos entran (busca en "colecciones")
     opciones -> textos y pestañas (todos opcionales)
   Las pestañas salen solas de la "categoria" de los productos.
   Si quieres otras (por ejemplo agrupar), pasa categorias: ['Figuras', ...]
   ---------------------------------------------------------- */
export async function renderSliderVendidos(selector, tag = 'vendidos', {
    titulo = 'Lo más vendido',
    subtitulo = 'Las favoritas de nuestra comunidad.',
    categorias = null,
} = {}) {
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    const productos = await cargarProductos();
    const filtrados = productos.filter((p) => p.colecciones?.includes(tag));

    // Si no hay productos con ese tag, no se pinta la sección vacía
    if (!filtrados.length) {
        contenedor.innerHTML = '';
        return;
    }

    // Pestañas: las que se pasen en "categorias" (solo las que tengan productos)
    // o, por defecto, cada categoría distinta de los productos, en el orden
    // en que aparecen en el JSON.
    const coincide = categorias ? coincideParcial : coincideExacto;
    let pestanas;

    if (categorias) {
        pestanas = categorias.filter((c) => filtrados.some((p) => coincide(p, c)));
    } else {
        const unicas = new Map();
        filtrados.forEach((p) => {
            const nombre = (p.categoria ?? '').trim();
            if (nombre && !unicas.has(normalizar(nombre))) unicas.set(normalizar(nombre), nombre);
        });
        pestanas = [...unicas.values()];
    }

    contenedor.innerHTML = plantilla(filtrados, pestanas, { titulo, subtitulo });
    initSlider(contenedor, filtrados, coincide);
}