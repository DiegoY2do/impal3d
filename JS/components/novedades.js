import { renderNovedadCard } from './novedadescard.js';

export function renderNovedades() {
    return `
        <section class="novedades-section">
            <div class="novedades-container container-max">

                <div class="novedades-header">
                    <div>
                        <h2>Novedades del taller</h2>
                        <p>Guías, ideas y lo que pasa detrás de cada capa.</p>
                    </div>

                    <a href="blog.html">Ir al blog</a>
                </div>

                <div class="novedades-grid">

                    ${renderNovedadCard(
                        './assets/img/novedades/filamento.jpg',
                        'Guías',
                        'Cómo elegir el filamento ideal para tu proyecto',
                        'PLA, PETG o TPU: qué material te conviene según el uso y el acabado que buscas.',
                        5
                    )}

                    ${renderNovedadCard(
                        './assets/img/novedades/llaveros.jpg',
                        'Ideas',
                        '5 ideas de regalos personalizados en 3D',
                        'Llaveros, figuras y detalles únicos que sorprenden en cualquier ocasión.',
                        4
                    )}

                    ${renderNovedadCard(
                        './assets/img/novedades/taller.jpg',
                        'Taller',
                        'Detrás de la capa: cómo cuidamos cada acabado',
                        'Un vistazo al proceso de revisión que sigue cada pieza antes de salir.',
                        6
                    )}

                </div>
            </div>
        </section>
    `;
}