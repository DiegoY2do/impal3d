export function renderResenasProducto() {
    const resumen = {
        promedio: 4.9,
        total: 212,
        distribucion: [
            { estrellas: 5, porcentaje: 84 },
            { estrellas: 4, porcentaje: 11 },
            { estrellas: 3, porcentaje: 3 },
            { estrellas: 2, porcentaje: 1 },
            { estrellas: 1, porcentaje: 1 }
        ]
    };

    const resenas = [
        {
            titulo: "Se ve increíble en mi repisa",
            comentario: 'El patrón calado se ve mucho mejor en persona. El dorado le da un toque elegante y llegó perfecto, sin una sola imperfección.',
            fecha: '15 de octubre de 2025',
            fechaISO: '2025-10-15',
            rating: 5,
            nombre: '[Nombre Apellido]'
        },
        {
            titulo: "Justo como en las fotos",
            comentario: 'Lo pedí en dorado y el color es hermoso. Ligero pero firme. Lo recomiendo para regalo.',
            fecha: '8 de octubre de 2025',
            fechaISO: '2025-10-08',
            rating: 5,
            nombre: '[Nombre Apellido]'
        },
        {
            titulo: "Muy bonito, empaque mejorable",
            comentario: 'La pieza es excelente. Solo le pondría un poco más de relleno a la caja, aunque no sufrió ningún daño.',
            fecha: '29 de septiembre de 2025',
            fechaISO: '2025-09-29',
            rating: 4,
            nombre: '[Nombre Apellido]'
        }
    ];

    return `
        <section class="resenas-producto-container">
            <div class="container-max">
                <h2 class="resenas-producto-titulo">Reseñas de clientes</h2>

                <div class="resenas-producto-layout">
                    <aside class="resenas-producto-resumen" aria-label="Resumen de calificaciones">
                        <div class="resenas-producto-promedio">
                            <strong>${resumen.promedio.toFixed(1)}</strong>
                            <span>de 5</span>
                        </div>

                        <div
                            class="resenas-producto-estrellas"
                            aria-label="${resumen.promedio} de 5 estrellas"
                        >
                            ${renderEstrellas(Math.round(resumen.promedio))}
                        </div>

                        <p class="resenas-producto-total">
                            Basado en ${resumen.total} reseñas
                        </p>

                        <div class="resenas-producto-distribucion">
                            ${resumen.distribucion.map(({ estrellas, porcentaje }) => `
                                <div class="resenas-producto-fila">
                                    <span>${estrellas}★</span>
                                    <span class="resenas-producto-barra">
                                        <span style="width: ${porcentaje}%"></span>
                                    </span>
                                    <span>${porcentaje}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </aside>

                    <div class="resenas-producto-lista">
                        ${resenas.map(resena => `
                            <article class="resenas-producto-card">
                                <div class="resenas-producto-card-header">
                                    <div
                                        class="resenas-producto-card-estrellas"
                                        aria-label="${resena.rating} de 5 estrellas"
                                    >
                                        ${renderEstrellas(resena.rating)}
                                    </div>
                                    <time datetime="${resena.fechaISO}">
                                        ${resena.fecha}
                                    </time>
                                </div>

                                <h3>${resena.titulo}</h3>

                                <p>${resena.comentario}</p>

                                <div class="resenas-producto-cliente">
                                    <strong>${resena.nombre}</strong>
                                    <span> · Compra verificada</span>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderEstrellas(rating) {
    const estrellas = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

    return `
        <span aria-hidden="true">
            ${'★'.repeat(estrellas)}<span class="estrella-vacia">${'★'.repeat(5 - estrellas)}</span>
        </span>
    `;
}