export function renderAboutValues(){
    return `
        <section class="about-values">
            <div class="container-max">
                <h2>Lo que nos mueve</h2>
                <p>Nuestra misión, visión y los valores con los que trabajamos.</p>
                
                <div class="values-grid">
                    <article class="value-card">
                        <span class="value-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="9"></circle>
                                <circle cx="12" cy="12" r="5"></circle>
                                <circle cx="12" cy="12" r="1"></circle>
                            </svg>
                        </span>
                        <h3>Misión</h3>
                        <p>Hacer que el diseño y la manufactura digital sean accesibles, con piezas bien terminadas para uso diario.</p>
                    </article>   
                    
                    <article class="value-card">
                        <span class="value-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </span>
                        <h3>Visión</h3>
                        <p>Ser la tienda de referencia en México para objetos impresos en 3D con acabado premium.</p>
                    </article>

                    <article class="value-card">
                        <span class="value-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"></path>
                            </svg>
                        </span>
                        <h3>Valores</h3>
                        <p>Precisión, honestidad con los tiempos, cuidado del detalle y respeto por el material y el medio ambiente.</p>
                    </article>
                </div>
            </div>
        </section>
    `;
}