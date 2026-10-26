export function renderContactForm() {
    return `
<section class="contact-section">
<div class="container contact-container">

    <!-- ENCABEZADO -->
    <div class="contact-hero">
        <div class="contact-breadcrumb">
            <a href="index.html">Inicio</a>
            <span>/</span>
            <span>Contacto</span>
        </div>

        <h1>Hablemos de tu próxima pieza</h1>
        <p>Cotizaciones, pedidos personalizados, dudas o soporte. Te respondemos en menos de un día hábil.</p>
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="contact-layout">

        <!-- FORMULARIO -->
        <div class="contact-card">

            <form id="contactForm" class="contact-form">

                <!-- NOMBRE -->
                <div class="contact-field">
                    <label for="nombre" class="form-label">Nombre completo</label>
                    <input type="text" class="form-control" id="nombre"
                    name="nombre" placeholder="Tu nombre"
                    autocomplete="name" minlength="3" maxlength="100" required>
                    <div class="invalid-feedback">Ingresa tu nombre completo.</div>
                </div>

                <!-- CORREO -->
                <div class="contact-field">
                    <label for="correo" class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" id="correo"
                    name="correo" placeholder="tu@correo.com"
                    autocomplete="email" maxlength="150" required>
                    <div class="invalid-feedback">Ingresa un correo electrónico válido.</div>
                </div>

                <!-- TELÉFONO -->
                <div class="contact-field">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input type="tel" class="form-control" id="telefono"
                    name="telefono" placeholder="55 0000 0000"
                    autocomplete="tel" inputmode="numeric"
                    maxlength="14" required>
                    <div class="invalid-feedback">Ingresa un teléfono de 10 dígitos.</div>
                </div>

                <!-- ASUNTO -->
                <div class="contact-field">
                    <label for="asunto" class="form-label">Asunto</label>
                    <select class="form-select" id="asunto" name="asunto" required>
                        <option value="" selected disabled>Selecciona un asunto</option>
                        <option value="cotizacion">Cotización de pieza personalizada</option>
                        <option value="pedido">Seguimiento de pedido</option>
                        <option value="informacion">Información general</option>
                        <option value="soporte">Soporte técnico</option>
                    </select>
                    <div class="invalid-feedback">Selecciona un asunto.</div>
                </div>

                <!-- MENSAJE -->
                <div class="contact-field contact-full">
                    <label for="mensaje" class="form-label">Mensaje</label>
                    <textarea class="form-control" id="mensaje"
                    name="mensaje" rows="5" minlength="10" maxlength="2000"
                    placeholder="Cuéntanos qué necesitas: medidas, material, cantidad..."
                    required></textarea>
                    <div class="invalid-feedback">Escribe un mensaje de al menos 10 caracteres.</div>
                </div>

                <!-- PRIVACIDAD -->
                <div class="contact-full">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                        id="privacidad" name="privacidad" required>
                        <label class="form-check-label" for="privacidad">
                            Acepto el
                            <a href="privacidad.html" class="contact-privacy-link">aviso de privacidad</a>
                        </label>
                    </div>
                </div>

                <!-- BOTÓN -->
                <div class="contact-full">
                    <button type="submit" class="btn contact-btn" id="contactSubmit">
                        Enviar mensaje
                    </button>
                </div>

                <!-- RESPUESTA DEL SERVIDOR -->
                <div class="contact-full">
                    <div id="contactStatus" class="contact-status"
                    role="status" aria-live="polite" hidden></div>
                </div>

            </form>

        </div>

        <!-- INFORMACIÓN DE CONTACTO -->
        <aside class="contact-sidebar">

            <!-- DIRECCIÓN -->
            <div class="contact-info-card">
                <div class="contact-icon">
                    <i class="bi bi-geo-alt"></i>
                </div>
                <div>
                    <h3>Taller y dirección</h3>
                    <p>[Calle y número, Colonia, Ciudad, CP]</p>
                </div>
            </div>

            <!-- TELÉFONO -->
            <div class="contact-info-card">
                <div class="contact-icon">
                    <i class="bi bi-telephone"></i>
                </div>
                <div>
                    <h3>Teléfono y WhatsApp</h3>
                    <p>[+52 00 0000 0000]</p>
                </div>
            </div>

            <!-- CORREO -->
            <div class="contact-info-card">
                <div class="contact-icon">
                    <i class="bi bi-envelope"></i>
                </div>
                <div>
                    <h3>Correo</h3>
                    <p>hola@tu-dominio.mx</p>
                </div>
            </div>

            <!-- HORARIO -->
            <div class="contact-info-card">
                <div class="contact-icon">
                    <i class="bi bi-clock"></i>
                </div>
                <div>
                    <h3>Horario de atención</h3>
                    <p>Lunes a sábado, de 10:00 a 19:00</p>
                </div>
            </div>

            <!-- REDES SOCIALES -->
            <div class="contact-social-card">

                <h3>¿Prefieres escribirnos directo?</h3>
                <p>Resolvemos dudas y cotizamos por WhatsApp de lunes a sábado.</p>

                <div class="contact-social-buttons">
                    <a href="#" class="contact-whatsapp-btn">
                        Abrir WhatsApp
                    </a>

                    <a href="#" class="contact-social-btn" aria-label="Instagram">
                        IG
                    </a>

                    <a href="#" class="contact-social-btn" aria-label="Facebook">
                        FB
                    </a>
                </div>

            </div>

        </aside>

    </div>
</div>
</section>
`;
}
