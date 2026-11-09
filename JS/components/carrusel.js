export function renderCarrusel() {
    return `
    <div id="carouselPeek" class="carousel carousel-auto carousel-center slide" data-bs-ends="wrap" aria-label="Figuras impresas en 3D">
        <span class="carrusel-sello">Hecho en México</span>
    <div class="carousel-inner">
    <div class="carousel-item active">
        <img class="carrusel-tarjeta" src="assets/img/carrusel/oogie.png" alt="Oogie Boogie impreso en 3D">
    </div>
    <div class="carousel-item">
        <img class="carrusel-tarjeta" src="assets/img/carrusel/mario.png" alt="Mario impreso en 3D">
    </div>
    <div class="carousel-item">
        <img class="carrusel-tarjeta" src="assets/img/carrusel/coraline.png" alt="Coraline impresa en 3D">
    </div>
    </div>
    <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselPeek" data-bs-slide-to="0"
        class="active" aria-current="true" aria-label="Ver Oogie Boogie"></button>

    <button type="button" data-bs-target="#carouselPeek" data-bs-slide-to="1"
        aria-label="Ver Mario"></button>

    <button type="button" data-bs-target="#carouselPeek" data-bs-slide-to="2"
        aria-label="Ver Coraline"></button>
    </div>
    </div>`;
}
