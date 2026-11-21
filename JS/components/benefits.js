
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
                     data-bs-touch="true"
                     data-bs-wrap="true">

                    <!-- DIAPOSITIVAS -->
                    <div class="carousel-inner">

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

    <!-- ENVÍO GRATIS (sigue siendo la primera que se ve) -->
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

</div>



                    
                </div>

            </div>
        </section>
    `;
}
