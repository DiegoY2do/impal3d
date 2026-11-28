export function renderProducto() {
    return `
        <main class="detalle-producto">
            <section class="producto-contenido">

                <!-- Galería -->
                <div class="producto-galeria">
                    <div class="producto-imagen">
                        <img id="producto-imagen" alt="Imagen del producto">
                    </div>
                    <div id="producto-miniaturas" class="producto-miniaturas"></div>
                </div>

                <!-- Información del producto -->
                <div class="producto-info">
                    <span id="producto-categoria" class="producto-categoria"></span>
                    <h1 id="producto-nombre"></h1>

                    <div class="producto-rating">
                        <span class="estrellas">★★★★★</span>
                        <span id="producto-calificacion"></span>
                        <span id="producto-resenas"></span>
                    </div>

                    <h2 id="producto-precio" class="producto-precio"></h2>
                    <p id="producto-descripcion" class="producto-descripcion"></p>

                    <!-- Colores -->
                    <div class="producto-colores">
                        <p>Color: <span id="color-seleccionado">Dorado</span></p>
                        <div class="colores-opciones">
                            <button class="color-opcion activo" data-color="Dorado" style="background-color: #B59B35;" aria-label="Dorado"></button>
                            <button class="color-opcion" data-color="Negro" style="background-color: #141414;" aria-label="Negro"></button>
                            <button class="color-opcion" data-color="Blanco" style="background-color: #FFFFFF;" aria-label="Blanco"></button>
                            <button class="color-opcion" data-color="Turquesa" style="background-color: #23C9B7;" aria-label="Turquesa"></button>
                        </div>
                    </div>

                    <!-- Tamaños -->
                    <div class="producto-tamanos">
                        <p>Tamaño</p>
                        <div class="tamanos-opciones">
                            <button class="tamano-opcion" data-tamano="Chico">Chico <small>18 cm</small></button>
                            <button class="tamano-opcion activo" data-tamano="Mediano">Mediano <small>24 cm</small></button>
                            <button class="tamano-opcion" data-tamano="Grande">Grande <small>32 cm</small></button>
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div class="producto-acciones">
                        <div class="producto-cantidad">
                            <button id="cantidad-menos" type="button" aria-label="Disminuir cantidad">−</button>
                            <span id="cantidad-valor">1</span>
                            <button id="cantidad-mas" type="button" aria-label="Aumentar cantidad">+</button>
                        </div>

                        <button class="producto-btn" id="agregar-carrito" type="button">Agregar al carrito</button>

                        <button class="producto-favorito" id="producto-favorito" type="button" aria-label="Agregar a favoritos" aria-pressed="false">
                            <svg class="icono-corazon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>

                    <button class="producto-comprar" id="comprar-ahora" type="button">Comprar ahora</button>

                    <!-- Disponibilidad -->
                    <div class="producto-disponibilidad">
                        <span class="disponibilidad-punto"></span>
                        <span><strong>En stock</strong> · Sale a producción en 2 a 4 días hábiles</span>
                    </div>

                    <!-- Envío -->
                    <div class="producto-envio">
                        <h3>Calcula tu envío</h3>
                        <div class="envio-formulario">
                            <input type="text" id="codigo-postal" placeholder="Código postal" maxlength="5" inputmode="numeric" aria-label="Código postal">
                            <button id="calcular-envio" type="button">Calcular</button>
                        </div>
                        <p id="envio-resultado" aria-live="polite"> Entrega estimada: 3 a 5 días hábiles · $99 MXN</p>
                    </div>

                    <!-- Compartir -->
                    <div class="producto-compartir">
                        <a id="compartir-whatsapp" href="#" target="_blank" rel="noopener noreferrer" aria-label="Consultar producto por WhatsApp">WA</a>
                        <a href="https://www.instagram.com/imp_al3d?srtk=MTI0bGZxc2FrMHVsOQ==" target="_blank" rel="noopener noreferrer" aria-label="Visitar Instagram de IMP AL3D">IG</a>
                        <a id="compartir-facebook" href="#" target="_blank" rel="noopener noreferrer" aria-label="Compartir producto en Facebook">FB</a>
                    </div>
                </div>
            </section>
        </main>
    `;
}

