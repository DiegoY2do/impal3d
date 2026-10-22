export function renderFooter(){
    return ` 
    <footer class="footer-custom text-white">

    <div class="col-12 col-md-12 col-lg-12">

      <!-- Suscripción -->
      <div class="newsletter p-4 rounded-4 mb-5">

            <div>
                 <h3>Únete a la comunidad IMP AI3D</h3>
                 <p>Lanzamientos, descuentos exclusivos y archivos de regalo cada mes.</p>
            </div>

           <div class="newsletter-form">
                <input class="correo" type="email" placeholder="Tu correo electrónico">

              <button class="btn btn-light">
               Suscribirme
               </button>
           </div>
     </div>

      <!-- Información -->
      <div class="information row col-md-3">

        <div>
             <h4>imp_al3d</h4>
             <br>
              <p>
                Impresión 3D de diseño y precisión.
                Piezas para tu casa, escritorio y tus ideas.
              </p>
        </div>

        <div class="col-md-3 col-lg-3 tienda">
          <h5>Tienda</h5>

          <ul class="list-unstyled">
            <li>Todos los productos</li>
            <li>Figuras articuladas</li>
            <li>Decoración</li>
            <li>Mascotas</li>
            <li>Modelos a escala</li>
          </ul>
        </div>

        <div class="col-md-3 col-lg-3 ayuda">
          <h5>Ayuda</h5>
          <ul class="list-unstyled">
            <li>Preguntas frecuentes</li>
            <li>Envíos y devoluciones</li>
            <li>Seguimiento de pedido</li>
            <li>Términos y condiciones</li>
          </ul>
        </div>

        <div class="col-md-3 col-lg-3 us" >
          <h5>Contacto</h5>
          <br>
          <p>WhatsApp: +52 55 56 4196 4434</p>
          <p>hola@impai3d.com</p>
          <p>Lun a sáb: 10:00 a 19:00</p>
        </div>

      </div>

      <hr>

      <!-- Pie inferior -->
      <div class="footer-bottom">

        <p>
          © 2026 IMP AI3D. Todos los derechos reservados.
        </p>

        <div class="payments">
          <span class="badge text-bg-secondary">Visa</span>
          <span class="badge text-bg-secondary">Mastercard</span>
          <span class="badge text-bg-secondary">OXXO</span>
          <span class="badge text-bg-secondary">PayPal</span>
        </div>

      </div>

    </div>

  </footer>
  `;
}