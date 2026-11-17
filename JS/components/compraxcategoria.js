export function renderCompraxcategoria() {
    return `
        <section class="categorias-container">
            <div class="container-max">
                <div class="categorias-header">
                    <div class="categorias-text">
                        <h2 class="categorias-title">Compra por categoría</h2>
                        <p>Encuentra justo lo que buscas, de figuras articuladas a llaveros personalizados.</p>
                    </div>
                    <div class="categorias-buttons">
                        <button type="button" class="categorias-btn" id="categorias-prev" aria-label="Categoría anterior">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button type="button" class="categorias-btn" id="categorias-next" aria-label="Categoría siguiente">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                        </div>
                    </div>

                <div class="categorias-cards" id="categorias-cards">
                    <div class="categoria-card">
                        <img src="./assets/img/categories/articulados.png" alt="Figuras articuladas">
                        <h3>Figuras articuladas</h3>
                        <p>86 productos</p>
                    </div>
                    <div class="categoria-card">
                        <img src="./assets/img/categories/decoracion.png" alt="Decoración">
                        <h3>Decoración</h3>
                        <p>124 productos</p>
                    </div>
                    <div class="categoria-card">
                        <img src="./assets/img/categories/mascotas.png" alt="Mascotas">
                        <h3>Mascotas</h3>
                        <p>58 productos</p>
                    </div>
                    <div class="categoria-card">
                        <img src="./assets/img/categories/modeloescala.png" alt="Modelos a escala">
                        <h3>Modelos a escala</h3>
                        <p>73 productos</p>
                    </div>
                    <div class="categoria-card">
                        <img src="./assets/img/categories/hogar.png" alt="Hogar">
                        <h3>Hogar</h3>
                        <p>31 productos</p>
                    </div>
                    <div class="categoria-card">
                        <img src="./assets/img/categories/personalizados.png" alt="Personalizados">
                        <h3>Personalizados</h3>
                        <p>40 productos</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Mueve las tarjetas al dar clic en las flechas
export function initCompraxcategoria() {
    const cards = document.getElementById("categorias-cards");
    const prev = document.getElementById("categorias-prev");
    const next = document.getElementById("categorias-next");

    prev.addEventListener("click", () => {
        cards.scrollBy({ left: -300, behavior: "smooth" });
    });

    next.addEventListener("click", () => {
        cards.scrollBy({ left: 300, behavior: "smooth" });
    });
}