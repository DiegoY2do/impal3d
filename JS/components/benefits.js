
export function renderBenefits() {
    return `
        <section class="benefits-container">
            <div class="container-max">

                <!-- VERSIÓN ESCRITORIO -->

                <div class="benefits-grid benefits-desktop">

                    <!-- ENVÍO GRATIS -->
                    <div class="benefits-card">
                        <div class="benefits-icon">
                            <i class="bi bi-truck"></i>
                        </div>

                        <div class="benefits-info">
                            <h3>Envío gratis</h3>
                            <p>En compras desde $999 MXN</p>
                        </div>
                    </div>

                    <!-- PAGO SEGURO -->
                    <div class="benefits-card">
                        <div class="benefits-icon">
                            <i class="bi bi-shield-check"></i>
                        </div>

                        <div class="benefits-info">
                            <h3>Pago seguro</h3>
                            <p>Tarjeta, OXXO, SPEI y PayPal</p>
                        </div>
                    </div>

                    <!-- DEVOLUCIONES -->
                    <div class="benefits-card">
                        <div class="benefits-icon">
                            <i class="bi bi-arrow-counterclockwise"></i>
                        </div>

                        <div class="benefits-info">
                            <h3>Devoluciones</h3>
                            <p>30 días en piezas de catálogo</p>
                        </div>
                    </div>

                    <!-- SOPORTE DIRECTO -->
                    <div class="benefits-card">
                        <div class="benefits-icon">
                            <i class="bi bi-chat-dots"></i>
                        </div>

                        <div class="benefits-info">
                            <h3>Soporte directo</h3>
                            <p>Por WhatsApp, lun a sáb</p>
                        </div>
                    </div>

                </div>


                <!--VERSIÓN MÓVIL: CARRUSEL-->

                <div id="benefitsCarousel"
                     class="carousel slide benefits-mobile"
                     data-bs-ride="false"
                     data-bs-touch="true"
                     data-bs-interval="false">

                    <!-- DIAPOSITIVAS -->
                    <div class="carousel-inner">

                        <!-- ENVÍO GRATIS -->
                        <div class="carousel-item active">
                            <div class="benefits-card">
                                <div class="benefits-icon">
                                    <i class="bi bi-truck"></i>
                                </div>

                                <div class="benefits-info">
                                    <h3>Envío gratis</h3>
                                    <p>En compras desde $999 MXN</p>
                                </div>
                            </div>
                        </div>

                        <!-- PAGO SEGURO -->
                        <div class="carousel-item">
                            <div class="benefits-card">
                                <div class="benefits-icon">
                                    <i class="bi bi-shield-check"></i>
                                </div>

                                <div class="benefits-info">
                                    <h3>Pago seguro</h3>
                                    <p>Tarjeta, OXXO, SPEI y PayPal</p>
                                </div>
                            </div>
                        </div>

                        <!-- DEVOLUCIONES -->
                        <div class="carousel-item">
                            <div class="benefits-card">
                                <div class="benefits-icon">
                                    <i class="bi bi-arrow-counterclockwise"></i>
                                </div>

                                <div class="benefits-info">
                                    <h3>Devoluciones</h3>
                                    <p>30 días en piezas de catálogo</p>
                                </div>
                            </div>
                        </div>

                        <!-- SOPORTE DIRECTO -->
                        <div class="carousel-item">
                            <div class="benefits-card">
                                <div class="benefits-icon">
                                    <i class="bi bi-chat-dots"></i>
                                </div>

                                <div class="benefits-info">
                                    <h3>Soporte directo</h3>
                                    <p>Por WhatsApp, lun a sáb</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <!-- indicadores -->

                    <div class="carousel-indicators benefits-indicators">

                        <button type="button"
                                data-bs-target="#benefitsCarousel"
                                data-bs-slide-to="0"
                                class="active"
                                aria-current="true"
                                aria-label="Beneficio 1">
                        </button>

                        <button type="button"
                                data-bs-target="#benefitsCarousel"
                                data-bs-slide-to="1"
                                aria-label="Beneficio 2">
                        </button>

                        <button type="button"
                                data-bs-target="#benefitsCarousel"
                                data-bs-slide-to="2"
                                aria-label="Beneficio 3">
                        </button>

                        <button type="button"
                                data-bs-target="#benefitsCarousel"
                                data-bs-slide-to="3"
                                aria-label="Beneficio 4">
                        </button>

                    </div>


                    <!-- BOTÓN ANTERIOR -->
                    <button class="carousel-control-prev"
                            type="button"
                            data-bs-target="#benefitsCarousel"
                            data-bs-slide="prev">

                        <span class="carousel-control-prev-icon"></span>
                        <span class="visually-hidden">Anterior</span>

                    </button>


                    <!-- BOTÓN SIGUIENTE -->
                    <button class="carousel-control-next"
                            type="button"
                            data-bs-target="#benefitsCarousel"
                            data-bs-slide="next">

                        <span class="carousel-control-next-icon"></span>
                        <span class="visually-hidden">Siguiente</span>

                    </button>

                </div>

            </div>
        </section>
    `;
}
