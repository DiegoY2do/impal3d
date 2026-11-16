export function renderResenas() {
    const resenas = [
        {
            comentario: 'El acabado es impecable, casi no se notan las líneas de capa. Llegó en tres días y muy bien empacado.',
            iniciales: 'NA',
            nombre: '[Nombre Apellido]'
        },
        {
            comentario: 'Pedí una pieza personalizada y me ayudaron a ajustar el diseño antes de imprimir. Quedó exactamente como la imaginé.',
            iniciales: 'NA',
            nombre: '[Nombre Apellido]'
        },
        {
            comentario: 'Colores bonitos y piezas resistentes. Ya es la tercera vez que compro y siempre cumplen con los tiempos.',
            iniciales: 'NA',
            nombre: '[Nombre Apellido]'
        }
    ];
    return `
        <section class="resenas-container">
            <div class="container-max">
                <div class="resenas-header">
                    <div>
                        <h2>
                            Lo que dicen nuestros clientes
                        </h2>
                        <p>
                            Reseñas de compras verificadas.
                        </p>
                    </div>

                    <div class="resenas-indicadores" aria-label="Páginas de reseñas">
                        <span class="indicador activo"></span>
                        <span class="indicador"></span>
                        <span class="indicador"></span>
                    </div>
                </div>

                <div class="resenas-grid">
                    ${resenas.map(resena => `
                        <article class="resena-card">
                            <div class="resena-estrellas" aria-label="5 estrellas">
                                ★★★★★
                            </div>

                            <p class="resena-comentario">
                                ${resena.comentario}
                            </p>

                            <div class="resena-cliente">
                                <div class="resena-avatar">
                                    ${resena.iniciales}
                                </div>

                                <div>
                                    <strong>${resena.nombre}</strong>
                                    <small>Compra verificada</small>
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}