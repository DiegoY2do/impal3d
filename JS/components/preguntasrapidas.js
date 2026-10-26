export function renderPreguntasRapidas() {
    return `
        <section class="preguntas-rapidas">
            <div class="container-max">
                <div class="preguntas-texto">
                    <h2>Preguntas rápidas</h2>
                    <p>Lo que más nos preguntan antes de escribirnos.</p>
                </div>
                <div class="preguntas-lista">
                    <details class="pregunta" open>
                        <summary>
                            ¿Cuánto tardan en hacer una pieza personalizada?
                        </summary>
                        <p>
                            Depende del tamaño y la complejidad. Normalmente entre 2 y 5 días hábiles después de aprobar el diseño.
                            Te confirmamos el tiempo exacto en la cotización.
                        </p>
                    </details>

                    <details class="pregunta">
                        <summary>
                            ¿Puedo mandar mi propio archivo 3D?
                        </summary>
                        <p>
                        Compartenos tu archivo para revisar si está listo para impresión y preparar una cotización.
                        </p>
                    </details>

                    <details class="pregunta">
                        <summary>
                            ¿Hacen envíos a todo el país?
                        </summary>
                        <p>
                        Compártenos tu código postal para confirmar la cobertura, el costo y el tiempo estimado de entrega.
                        </p>
                    </details>
                </div>
            </div>
        </section>
    `;
}