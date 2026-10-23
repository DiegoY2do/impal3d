export function renderFooter(){
    return ` 
    <footer class="footer-custom text-white">
      <div class="container-max">

          <div class="col-12 col-md-12 col-lg-12">

                      <!-- Suscripción -->
                    <div class="newsletter p-4 rounded-4 mb-5">
                      <div>
                       <h3>Únete a la comunidad imp_al3d</h3>
                       <p>Lanzamientos, descuentos exclusivos y archivos de regalo cada mes.</p>
                      </div>

                     <div class="newsletter-form">
                     <form action="" method="post" class="news-form"> 
                      <input class="correo" type="email" placeholder="Tu correo electrónico" required>
                      <input type="submit" value="Suscribirme" class="btn btn-light">
                     </form>
                   
                    </div>  
                      
                      
                 
               </div>

      <!-- Información -->
      <div class="information row col-md-3">

          <div>
               <img  src="./assets/img/brand/logo-imp-al3d-blanco.svg"  width="100"  height="80" >
             <h4></h4>
             <br>
              <p>
                Impresión 3D de diseño y precisión.
                Piezas para tu casa, escritorio y tus ideas.
              </p>
          </div>

              <div class="col-md-3 col-lg-3 tienda">
                    <h5>Tienda</h5>

                  <ul class="list-unstyled">
                   <br>
                    <li>Todos los productos</li>
                    <br>
                    <li>Figuras articuladas</li>
                    <br>
                    <li>Decoración</li>
                    <br>
                    <li>Mascotas</li>
                    <br>
                    <li>Modelos a escala</li>
                   </ul>
                 </div>

                   <div class="col-md-3 col-lg-3 ayuda">
                     <h5>Ayuda</h5>
                     <br>
                    <ul class="list-unstyled">
                    <li>Preguntas frecuentes</li>
                    <br>
                    <li>Envíos y devoluciones</li>
                    <br>
                    <li>Seguimiento de pedido</li>
                    <br>
                    <li>Términos y condiciones</li>
                    </ul>
                   </div>

                   <div class="col-md-3 col-lg-3 us" >
                    <h5>Contacto</h5>
                    <br>
                     <p>WhatsApp: +52 55 56 4196 4434</p>
                     <br>
                    <p>hola@impai3d.com</p>
                    <br>
                    <p>Lun a sáb: 10:00 a 19:00</p>
                   </div>

                </div>

          <hr>

               <!-- Pie inferior -->
               <div class= "container foot"
               <div class="footer-botton ">   
                  <p class="derechos" > © 2026 imp_al3d. Todos los derechos reservados.</p>
              
                  <div class="payments">
                  <span class="badge text-bg-secondary">Visa</span>
                  <span class="badge text-bg-secondary">Mastercard</span>
                  <span class="badge text-bg-secondary">OXXO</span>
                  <span class="badge text-bg-secondary">PayPal</span>
               </div>
               </div>
              

        </div>
      </div>
    </div>

  </footer>
  `;
}