 
export function renderTimeline() {
    return `
        <section class="historia py-5">
            <div class="container-max mx-auto">

                <div class="row mb-4">
                    <div class="col-12">
                        <h2 class="fw-bold">Nuestra historia</h2>
                        <p class="historia-subtitulo">
                            De una impresora en casa a un taller completo.
                        </p>
                    </div>
                </div>

                <div class="timeline">

                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <span class="timeline-year">2022</span>
                        <h5 class="fw-bold">Nace la idea</h5>
                        <p>
                            Una impresora 3D y muchas ganas de experimentar.
                        </p>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <span class="timeline-year">2023</span>
                        <h5 class="fw-bold">Primeras ventas</h5>
                        <p>
                            Los primeros pedidos llegan por recomendación.
                        </p>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <span class="timeline-year">2024</span>
                        <h5 class="fw-bold">Tienda en línea</h5>
                        <p>
                            Abrimos el catálogo y los envíos a todo el país.
                        </p>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <span class="timeline-year">2025</span>
                        <h5 class="fw-bold">Crece el taller</h5>
                        <p>
                            Más equipos, materiales y un equipo dedicado.
                        </p>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <span class="timeline-year">Hoy</span>
                        <h5 class="fw-bold">Piezas con firma</h5>
                        <p>
                            Colecciones propias y proyectos personalizados.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    `;
}
