import { cargarProductos } from './productos.js';
import { renderCard } from './cards.js';

const iconoPrev = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`;
const iconoNext = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

// Recibe los productos y los textos, y devuelve el HTML de toda la sección
function plantilla(productos, { titulo, texto, enlace }) {
    return `
    <section class="slider-ofertas">
        <div class="container-max">

            <!-- Flechas: arriba del panel gris y por fuera de él,
                 para que no estiren la altura del panel negro -->
            <div class="ofertas-controles">
                <button class="ofertas-flecha ofertas-flecha-prev" type="button" aria-label="Anterior">${iconoPrev}</button>
                <button class="ofertas-flecha ofertas-flecha-next" type="button" aria-label="Siguiente">${iconoNext}</button>
            </div>

            <div class="container-ofertas">

                <!-- Panel fijo: no se mueve con el carrusel -->
                <div class="ofertas-banner">
                    <span class="ofertas-badge">Oferta de la semana</span>

                    <h2 class="ofertas-titulo">${titulo}</h2>

                    <p class="ofertas-texto">${texto}</p>

                    <!-- Cuenta regresiva: los números los pone initCuenta() -->
                    <div class="ofertas-cuenta" role="timer" aria-label="Tiempo restante de la oferta">
                        <div class="ofertas-cuenta-item">
                            <span class="ofertas-cuenta-valor" data-unidad="dias">00</span>
                            <span class="ofertas-cuenta-label">Días</span>
                        </div>
                        <div class="ofertas-cuenta-item">
                            <span class="ofertas-cuenta-valor" data-unidad="horas">00</span>
                            <span class="ofertas-cuenta-label">Horas</span>
                        </div>
                        <div class="ofertas-cuenta-item">
                            <span class="ofertas-cuenta-valor" data-unidad="min">00</span>
                            <span class="ofertas-cuenta-label">Min</span>
                        </div>
                        <div class="ofertas-cuenta-item">
                            <span class="ofertas-cuenta-valor" data-unidad="seg">00</span>
                            <span class="ofertas-cuenta-label">Seg</span>
                        </div>
                    </div>

                    <a class="ofertas-boton" href="${enlace}">Ver ofertas</a>
                </div>

                <!-- Carrusel: solo esto se desplaza -->
                <div class="ofertas-slider">
                    <div class="ofertas-track">
                        ${productos.map(renderCard).join('')}
                    </div>
                </div>

            </div>
        </div>
    </section>
    `;
}

/* ----------------------------------------------------------
   CUENTA REGRESIVA
   Si no se indica fecha, la oferta termina el domingo a las
   23:59:59 (y al terminar empieza a contar la semana siguiente).
   ---------------------------------------------------------- */
function finDeSemana() {
    const ahora = new Date();
    const diasHastaDomingo = (7 - ahora.getDay()) % 7; // getDay(): 0 = domingo
    const fin = new Date(ahora);
    fin.setDate(ahora.getDate() + diasHastaDomingo);
    fin.setHours(23, 59, 59, 999);
    return fin;
}

function initCuenta(contenedor, fechaFin) {
    const cuenta = contenedor.querySelector('.ofertas-cuenta');
    if (!cuenta) return;

    const valores = {
        dias: cuenta.querySelector('[data-unidad="dias"]'),
        horas: cuenta.querySelector('[data-unidad="horas"]'),
        min: cuenta.querySelector('[data-unidad="min"]'),
        seg: cuenta.querySelector('[data-unidad="seg"]'),
    };

    // Fecha fija solo si se pasó una válida; si no, se usa el domingo
    const fija = fechaFin ? new Date(fechaFin) : null;
    const usarFija = fija && !isNaN(fija);

    const dosDigitos = (n) => String(n).padStart(2, '0');

    const actualizar = () => {
        // Si la sección ya no está en la página, se detiene el reloj
        if (!cuenta.isConnected) {
            clearInterval(reloj);
            return;
        }

        const objetivo = usarFija ? fija : finDeSemana();
        const total = Math.floor(Math.max(0, objetivo - new Date()) / 1000);

        valores.dias.textContent = dosDigitos(Math.floor(total / 86400));
        valores.horas.textContent = dosDigitos(Math.floor((total % 86400) / 3600));
        valores.min.textContent = dosDigitos(Math.floor((total % 3600) / 60));
        valores.seg.textContent = dosDigitos(total % 60);

        if (usarFija && total === 0) clearInterval(reloj);
    };

    const reloj = setInterval(actualizar, 1000);
    actualizar();
}

/* ----------------------------------------------------------
   FLECHAS DEL CARRUSEL
   ---------------------------------------------------------- */
function initCarrusel(contenedor) {
    const track = contenedor.querySelector('.ofertas-track');
    const prev = contenedor.querySelector('.ofertas-flecha-prev');
    const next = contenedor.querySelector('.ofertas-flecha-next');
    const primeraCard = track.querySelector('.card');

    if (!primeraCard) return;

    const paso = () => {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return primeraCard.offsetWidth + gap;
    };

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

export async function renderSliderOfertas(selector, tag = 'ofertas', {
    titulo = 'Hasta 30% en figuras y llaveros',
    texto = 'Termina pronto. Aprovecha antes de que se agoten.',
    enlace = 'productos.html',
    fechaFin = null, // ej: '2026-11-15T23:59:59'
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

    contenedor.innerHTML = plantilla(filtrados, { titulo, texto, enlace });
    initCuenta(contenedor, fechaFin);
    initCarrusel(contenedor);
}