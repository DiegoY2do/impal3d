import './newsletter.js'

export function renderFooter() {
    return `
        <footer class="footer-container">
            <div class="container-max">

                <!-- Suscripción -->
                <section class="newsletter">
                    <div>
                        <h3>Únete a la comunidad imp_al3d</h3>
                        <p>Lanzamientos, descuentos exclusivos y archivos de regalo cada mes.</p>
                    </div>

                    <form class="news-form" data-newsletter>
                        <input type="email" name="email" placeholder="Tu correo electrónico"
                            aria-label="Tu correo electrónico" autocomplete="email" required>
                        <button type="submit">Suscribirme</button>
                        <p class="news-msg" aria-live="polite"></p>
                    </form>
                </section>

                <!-- Información -->
                <section class="information">

                    <div class="footer-brand">
                        <a href="">
                            <img src="./assets/img/brand/logo-imp-al3d-blanco.svg" alt="Logo IMP AI3D" width="100">
                        </a>
                        <p>Impresión 3D de diseño y precisión. Piezas para tu casa, tu escritorio y tus ideas.</p>

                        <div class="social-links" aria-label="Redes sociales">
                            <a target="_blank"  href="https://www.instagram.com/imp_al3d?srtk=MTI0bGZxc2FrMHVsOQ==" aria-label="Instagram">IG</a>
                            <a target="_blank" href="https://www.facebook.com/share/1F7bRgmSxr/" aria-label="Facebook">FB</a>
                            <a target="_blank" href="https://www.tiktok.com/@imp_al3d?_r=1&_t=ZS-9AoCdZfaOJz" aria-label="TikTok">TT</a>
                        </div>
                    </div>

                    <div class="footer-column">
                        <h5>Tienda</h5>
                        <ul>
                            <li><a href="./index.html">Todos los productos</a></li>
                            <li><a href="./index.html">Figuras articuladas</a></li>
                            <li><a href="./index.html">Decoración</a></li>
                            <li><a href="./index.html">Mascotas</a></li>
                            <li><a href="./index.html">Modelos a escala</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h5>Ayuda</h5>
                        <ul>
                            <li><a href="./index.html">Preguntas frecuentes</a></li>
                            <li><a href="./index.html">Envíos y devoluciones</a></li>
                            <li><a href="./index.html">Seguimiento de pedido</a></li>
                            <li><a href="./index.html">Términos y condiciones</a></li>
                            <li><a href="./index.html">Aviso de privacidad</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h5>Contacto</h5>
                        <ul>
                            <a href="https://www.google.com/maps?cid=8356277705370852712&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF" target="_blank" rel="noopener noreferrer">
                                <li>Utopía Tezontli, San AntonioUtopía Tezontli, San Antonio.<br> 
                                Iztapalapa, 09900 Ciudad de México, CDMX</li>
                            </a>
                            
                            <a href="https://api.whatsapp.com/send/?phone=525641964434&text=Hola%2C+me+gustar%C3%ADa+solicitar+una+cotizaci%C3%B3n+en+IMP+AL3D.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                                <li>WhatsApp: +52 55 56 4196 4434</li>
                            </a>
                            
                            <a href="mailto:hola@impai3d.com">
                                <li>hola@impai3d.com</li>
                            </a>
                            <li>Lun a sáb: 10:00 a 19:00</li>
                        </ul>
                    </div>

                </section>

                <!-- Pie inferior -->
                <div class="footer-bottom">
                    <p>© 2026 imp_al3d. Todos los derechos reservados.</p>

                    <div class="payments" aria-label="Métodos de pago">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>OXXO</span>
                        <span>SPEI</span>
                        <span>PayPal</span>
                    </div>
                </div>

            </div>
        </footer>
    `;
}