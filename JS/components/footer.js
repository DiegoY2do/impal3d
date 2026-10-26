export function renderFooter(){
  return ` 
    <footer class="footer-container">
       <div class="container-max">
          

        <!-- Suscripción -->
        <section class="newsletter" >
          <div class="newsletter-content">
            <h3>Únete a la comunidad imp_al3d</h3>
            <p>
              Lanzamientos, descuentos exclusivos y archivos
              de regalo cada mes.
            </p>
          </div>

          <form id="form-newsletter" action="" method="post" class="news-form" >
            <input class="correo" type="email" name="email" placeholder="Tu correo electrónico"
              aria-label="Tu correo electrónico" required>
            <button type="submit" class="btn-suscribir">
              Suscribirme
            </button>
          </form>
        </section>

        <!-- Información del footer -->
        <section class="information">

          <!-- Marca -->
          <div class="footer-brand">
            <img
              src="./assets/img/brand/logo-imp-al3d-blanco.svg"
              alt="Logo IMP AI3D"
              width="100"
            >

            <p>
              Impresión 3D de diseño y precisión.
              Piezas para tu casa, tu escritorio y tus ideas.
            </p>

            <div class="social-links" aria-label="Redes sociales">
              <a href="https://www.instagram.com/imp_al3d?srtk=MTI0bGZxc2FrMHVsOQ==" aria-label="Instagram">IG</a>
              <a href="https://www.facebook.com/share/1F7bRgmSxr/" aria-label="Facebook">FB</a>
              <a href="https://www.tiktok.com/@imp_al3d?_r=1&_t=ZS-9AoCdZfaOJz" aria-label="TikTok">TT</a>
            </div>
          </div>

          <!-- Tienda -->
          <div class="footer-column">
            <h5>Tienda</h5>
            <ul>
              <li><a href="#">Todos los productos</a></li>
              <li><a href="#">Figuras articuladas</a></li>
              <li><a href="#">Decoración</a></li>
              <li><a href="#">Mascotas</a></li>
              <li><a href="#">Modelos a escala</a></li>
            </ul>
          </div>

          <!-- Ayuda -->
          <div class="footer-column">
            <h5>Ayuda</h5>
            <ul>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Envíos y devoluciones</a></li>
              <li><a href="#">Seguimiento de pedido</a></li>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Aviso de privacidad</a></li>
            </ul>
          </div>

          <!-- Contacto -->
          <div class="footer-column footer-contact">
            <h5>Contacto</h5>
            <ul>
              <li>[Calle y número, colonia, ciudad]</li>
              <li>WhatsApp: +52 55 56 4196 4434</li>
              <li>hola@impai3d.com</li>
              <li>Lun a sáb: 10:00 a 19:00</li>
            </ul>
          </div>

        </section>

        <!-- Línea divisoria -->
        <hr class="footer-divider">

        <!-- Pie inferior -->
        <div class="footer-bottom">
          <p class="derechos">
            © 2026 imp_al3d. Todos los derechos reservados.
          </p>

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