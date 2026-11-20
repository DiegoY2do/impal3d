export function renderBannerInicio() {
    return `
        <section class="banner-inicio container-max">
            <div class="banner-inicio-texto">
                <span class="banner-inicio-etiqueta">Nueva colección - Otoño 2026</span>
                <h1>Diseño que cobra forma, capa por capa.</h1>
                <p>Piezas impresas en 3D de alta precisión para tu casa, tu escritorio y tus ideas. Hechas en México y listas en días.</p>

                <div class="banner-inicio-botones">
                    <a href="#slider-destacados">Ver productos</a>
                    <a href="contacto.html">Personaliza el tuyo</a>
                </div>
            </div>

            <div class="banner-figuras" aria-label="Figuras impresas en 3D">
                <div class="figura-card figura-card--izquierda">
                    <img src="assets/img/carrusel/oogie.png" alt="Oogie Boogie impreso en 3D">
                </div>

                <div class="figura-card figura-card--derecha">
                    <img src="assets/img/carrusel/coraline.png" alt="Coraline impresa en 3D">
                </div>

                <div class="figura-card figura-card--centro">
                    <img src="assets/img/carrusel/mario.png" alt="Mario impreso en 3D">
                </div>

                <span class="banner-figuras-sello">Hecho en México</span>
            </div>
        </section>
    `;
}