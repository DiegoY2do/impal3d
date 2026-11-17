import { cargarProductos } from './productos.js';
import { renderCard } from './cards.js';

const iconoPrev = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`;
const iconoNext = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

function plantilla(productos, { titulo, subtitulo, enlace }) {
    return `
    <section class="slider-destacados">
        <div class="container-max">
            <div class="container-destacados">

                <div class="destacados-header">
                    <div class="destacados-text">
                        <h2>${titulo}</h2>
                        <p>${subtitulo}</p>
                    </div>

                    <div class="destacados-controles">
                        <a class="destacados-ver-todos" href="${enlace}">Ver todos</a>
                        <button class="destacados-flecha destacados-flecha-prev" type="button" aria-label="Anterior">${iconoPrev}</button>
                        <button class="destacados-flecha destacados-flecha-next" type="button" aria-label="Siguiente">${iconoNext}</button>
                    </div>
                </div>

                <div class="destacados-track">
                    ${productos.map(renderCard).join('')}
                </div>

            </div>
        </div>
    </section>
    `;
}

// Comportamiento de las flechas (se ejecuta DESPUÉS de pintar el HTML)
function initSliderDestacados(contenedor) {
    const track = contenedor.querySelector('.destacados-track');
    const prev = contenedor.querySelector('.destacados-flecha-prev');
    const next = contenedor.querySelector('.destacados-flecha-next');
    const primeraCard = track.querySelector('.card');

    if (!primeraCard) return;

    // Cuánto se desplaza por clic: una card + el espacio entre cards
    const paso = () => {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return primeraCard.offsetWidth + gap;
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

    actualizarFlechas();
}


export async function renderSliderDestacados(selector, tag = 'destacados', {
    titulo = 'Productos destacados',
    subtitulo = 'Lo nuevo y lo que más nos piden esta temporada.',
    enlace = 'productos.html',
} = {}) {
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    const productos = await cargarProductos();
    const filtrados = productos.filter((p) => p.colecciones?.includes(tag));

    if (!filtrados.length) {
        contenedor.innerHTML = '';
        return;
    }

    contenedor.innerHTML = plantilla(filtrados, { titulo, subtitulo, enlace });
    initSliderDestacados(contenedor);
}