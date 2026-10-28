export function renderInicioHero() {
    return `
        <section class="hero-inicio">
            <div class="container-max">
                <div class="container-inicio">
                    <div class="inicio-texto">
                        <div class="badge-morado">Impresión 3D personalizada</div>

                        <h1>Tu próxima pieza favorita se imprime capa por capa.</h1>

                        <p>Juguetes, figuras y miniaturas originales, diseñados e impresos en 3D a tu gusto. Cuéntanos tu idea y la hacemos realidad.</p>

                        <div class="inicio-aviso">
                            <span class="inicio-punto" aria-hidden="true"></span>
                            <div>
                                <strong>Sitio en construcción</strong>
                                <p>Estamos armando la tienda. Muy pronto vas a encontrar aquí tu próximo producto.</p>
                            </div>
                        </div>

                        <div class="container-btn">
                            <a class="btn-primary" href="contacto.html">Hablemos</a>
                            <a class="btn-secundary" href="about.html">Sobre nosotros</a>
                        </div>
                    </div>

                    <div class="inicio-img">
                        <span class="inicio-etiqueta">Hecho en México</span>
                        <img src="assets/img/banners/banner-about.webp" alt="Figuras y juguetes impresos en 3D por imp_al3d">
                    </div>
                </div>
            </div>
        </section>
    `;
}