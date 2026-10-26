export function renderContactForm() {
    return `
<section class="contact-section">
<div class="container contact-container">

    <div class="contact-hero">
        <div class="contact-breadcrumb">
            <a href="index.html">Inicio</a>
            <span>/</span>
            <span>Contacto</span>
        </div>

        <h1>Hablemos de tu próxima pieza</h1>
        <p>Cotizaciones, pedidos personalizados, dudas o soporte. Te respondemos en menos de un día hábil.</p>
    </div>

    <div class="contact-layout">

        <div class="contact-card">

            <form id="contactForm" class="contact-form" action="https://formspree.io/f/xdeeelej" method="POST">

                <div class="contact-field">
                    <label for="nombre" class="form-label">Nombre completo</label>
                    <input type="text" class="form-control" id="nombre"
                    name="nombre" placeholder="Tu nombre"
                    autocomplete="name" minlength="3" maxlength="100" required>
                    <div class="invalid-feedback">Ingresa tu nombre completo.</div>
                </div>

                <div class="contact-field">
                    <label for="correo" class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" id="correo"
                    name="correo" placeholder="tu@correo.com"
                    autocomplete="email" maxlength="150" required>
                    <div class="invalid-feedback">Ingresa un correo electrónico válido.</div>
                </div>

                <div class="contact-field">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input type="tel" class="form-control" id="telefono"
                    name="telefono" placeholder="55 0000 0000"
                    inputmode="numeric" pattern="[0-9]{10}" minlength="10"
                    maxlength="10" required>
                    <div class="invalid-feedback">Ingresa un teléfono de 10 dígitos.</div>
                </div>

                <div class="contact-field">
                    <label for="asunto" class="form-label">Asunto</label>
                    <select class="form-select" id="asunto" name="asunto" required>
                        <option value="" selected disabled>Selecciona un asunto</option>
                        <option value="cotizacion">Cotización de pieza personalizada</option>
                        <option value="pedido">Seguimiento de pedido</option>
                        <option value="informacion">Información general</option>
                    </select>
                    <div class="invalid-feedback">Selecciona un asunto.</div>
                </div>

                <div class="contact-field contact-full">
                    <label for="mensaje" class="form-label">Mensaje</label>
                    <textarea class="form-control" id="mensaje"
                    name="mensaje" rows="5" minlength="10" maxlength="2000"
                    placeholder="Cuéntanos qué necesitas: medidas, material, cantidad..."
                    required></textarea>
                    <div class="invalid-feedback">Escribe un mensaje de al menos 10 caracteres.</div>
                </div>

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

                <div class="contact-full">
                    <button type="submit" class="btn contact-btn" id="contactSubmit">
                        Enviar mensaje
                    </button>
                </div>

                <div class="contact-full">
                    <div id="contactStatus" class="contact-status"
                    role="status" aria-live="polite" hidden></div>
                </div>

            </form>

        </div>

        <!-- Información de contacto -->
        <aside class="contact-sidebar">

            <!-- Dirección -->
            <div class="contact-info-card">
                <div class="contact-icon">
                    <i class="bi bi-geo-alt"></i>
                </div>
                <div>
                    <h3>Taller y dirección</h3>
                    <p>Utopía Tezontli, San AntonioUtopía Tezontli, San Antonio, Iztapalapa, 
                    09900 Ciudad de México, CDMX, Iztapalapa, 09900 Ciudad de México, CDMX</p>
                </div>
            </div>

            <!-- Teléfono -->
            <div class="contact-info-card">
                <div class="contact-icon">
                    <i class="bi bi-telephone"></i>
                </div>
                <div>
                    <h3>Teléfono y WhatsApp</h3>
                    <p>+52 56 4196 4434</p>
                </div>
            </div>

            <!-- Correo -->
            <div class="contact-info-card">
                <div class="contact-icon">
                    <i class="bi bi-envelope"></i>
                </div>
                <div>
                    <h3>Correo</h3>
                    <p>hola@impai3d.com</p>
                </div>
            </div>

            <!-- Horario -->
            <div class="contact-info-card">
                <div class="contact-icon">
                    <i class="bi bi-clock"></i>
                </div>
                <div>
                    <h3>Horario de atención</h3>
                    <p>Lunes a sábado, de 10:00 a 19:00</p>
                </div>
            </div>

            <!-- Redes -->
            <div class="contact-social-card">

                <h3>¿Prefieres escribirnos directo?</h3>
                <p>Resolvemos dudas y cotizamos por WhatsApp de lunes a sábado.</p>

                <div class="contact-social-buttons">
                    <a href="https://wa.me/525641964434?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20en%20IMP%20AL3D." class="contact-whatsapp-btn"> 
                        Abrir WhatsApp
                    </a>
                    
                    <a href="https://www.instagram.com/imp_al3d?srtk=MTI0bGZxc2FrMHVsOQ==" aria-label="Instagram" target="_blank" rel="noopener noreferrer" class="btn-instagram">IG</a>
                   

                    <a href="https://www.facebook.com/share/1F7bRgmSxr/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" class="btn-facebook">FB</a>
                </div>

            </div>

        </aside>

    </div>
</div>
</section>
`;
}
