export function renderFooter(){
    return ` 
    <footer class="footer-custom text-white">

    <div class="container">

      <!-- Suscripción -->
      <div class="newsletter p-4 rounded-4 mb-5">

            <div>
                 <h3>Únete a la comunidad IMP AI3D</h3>
                 <p>Lanzamientos, descuentos exclusivos y archivos de regalo cada mes.</p>
            </div>

           <div class="newsletter-form">
                <input type="email" placeholder="Tu correo electrónico">

              <button class="btn btn-light">
               Suscribirme
               </button>
           </div>
     </div>

      <!-- Información -->
      <div class="information row">

        <div class="col-md-3 diseño">
             <h4>IMP AI3D</h4>
              <p>
                Impresión 3D de diseño y precisión.
                Piezas para tu casa, escritorio y tus ideas.
              </p>
        </div>

        <div class="col-md-3">
          <h5>Tienda</h5>

          <ul class="list-unstyled">
            <li>Todos los productos</li>
            <li>Figuras articuladas</li>
            <li>Decoración</li>
            <li>Mascotas</li>
            <li>Modelos a escala</li>
          </ul>
        </div>

        <div class="col-md-3 ayuda">
          <h5>Ayuda</h5>
          <ul class="list-unstyled">
            <li>Preguntas frecuentes</li>
            <li>Envíos y devoluciones</li>
            <li>Seguimiento de pedido</li>
            <li>Términos y condiciones</li>
          </ul>
        </div>

        <div class="col-md-3 us" >
          <h5>Contacto</h5>
          <p>WhatsApp: +52 000 000 0000</p>
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