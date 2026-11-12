
const colecciones = [
    {
        categoria: 'Mascotas',
        titulo: 'Compañeros en miniatura',
        imagen: 'assets/img/colecciones/mascotas.png',
        fondo: 'lila',
        alt: 'Figuras de mascotas impresas en 3D'
    },
    {
        categoria: 'Decoración',
        titulo: 'Arte Voronoi para tu espacio',
        imagen: 'assets/img/colecciones/decoracion.png',
        fondo: 'negro',
        alt: 'Pieza decorativa impresa en 3D'
    },
    {
        categoria: 'Coleccionables',
        titulo: 'Figuras articuladas',
        imagen: 'assets/img/colecciones/zorro.png',
        fondo: 'gris',
        alt: 'Figura articulada de zorro impresa en 3D'
    }
];

export function renderColecciones() {
    return `
        <section class="colecciones-section container-max">
            <div class="colecciones-encabezado">
                <div>
                    <span class="colecciones-etiqueta">IMP AL3D</span>
                    <h2>Explora nuestras colecciones</h2>
                    <p>Encuentra piezas únicas para cada espacio y ocasión.</p>
                </div>

                <div class="colecciones-controles">
                    <button class="colecciones-flecha"
                        id="colecciones-prev"
                        aria-label="Colección anterior">
                        <i class="bi bi-chevron-left"></i>
                    </button>

                    <button class="colecciones-flecha"
                        id="colecciones-next"
                        aria-label="Colección siguiente">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div class="colecciones-carrusel" id="colecciones-carrusel">
                ${colecciones.map(coleccion => `
                    <article class="coleccion-card ${coleccion.fondo}">
                        <div class="coleccion-contenido">
                            <span class="coleccion-categoria">
                                ${coleccion.categoria}
                            </span>

                            <h3>${coleccion.titulo}</h3>

                            <a href="#slider-destacados">
                                Explorar colección
                                <span>→</span>
                            </a>
                        </div>

                        <div class="coleccion-imagen">
                            ${coleccion.imagen ? `
                                <img
                                    src="${coleccion.imagen}"
                                    alt="${coleccion.alt}"
                                    loading="lazy">
                            ` : `
                                <div class="coleccion-placeholder">
                                    <i class="bi bi-image"></i>
                                    <span>Imagen próximamente</span>
                                </div>
                            `}
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>
    `;
}

export function initColecciones() {
    const carrusel = document.querySelector('#colecciones-carrusel');
    const anterior = document.querySelector('#colecciones-prev');
    const siguiente = document.querySelector('#colecciones-next');

    if (!carrusel || !anterior || !siguiente) return;

    siguiente.addEventListener('click', () => {
        carrusel.scrollBy({
            left: carrusel.clientWidth,
            behavior: 'smooth'
        });
    });

    anterior.addEventListener('click', () => {
        carrusel.scrollBy({
            left: -carrusel.clientWidth,
            behavior: 'smooth'
        });
    });
}
