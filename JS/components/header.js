export function renderNavbar() {
  return `
    <header class="site-header">
      <input type="checkbox" id="announcement-toggle" class="css-toggle">
      <input type="checkbox" id="menu-toggle" class="css-toggle">

      <div class="announcement-bar">
        <p>
          Envío gratis en compras mayores a $999 MXN
          · Usa el código <strong>BIENVENIDO10</strong>
        </p>
        <label for="announcement-toggle" class="announcement-close" aria-label="Cerrar anuncio">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </label>
      </div>

      <label for="menu-toggle" class="mobile-nav-overlay" aria-hidden="true"></label>

      <nav class="store-navbar" aria-label="Navegación principal">
        <a class="store-logo" href="index.html" aria-label="Inicio">
          <img src="./assets/img/brand/logo-imp-al3d-negro.svg" alt="Logo de Impal3D" width="72" height="48">
        </a>

        <div class="store-menu">
          <div class="mobile-menu-header">
            <span>Menú</span>
            <label for="menu-toggle" class="mobile-menu-close" aria-label="Cerrar menú">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </label>
          </div>

          <div class="store-links">
            <a class="store-link active" href="index.html">Inicio</a>

            <div class="store-dropdown">
              <input type="checkbox" id="dropdown-productos" class="css-toggle store-dropdown__check">
              <a class="store-link" href="./index.html">Productos</a>
              <label for="dropdown-productos" class="store-dropdown__arrow" aria-label="Mostrar opciones de Productos">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </label>
              <ul class="store-submenu">
                <li><a href="./index.html">Categoría 1</a></li>
                <li><a href="./index.html">Categoría 2</a></li>
                <li><a href="./index.html">Categoría 3</a></li>
              </ul>
            </div>

            <div class="store-dropdown">
              <input type="checkbox" id="dropdown-colecciones" class="css-toggle store-dropdown__check">
              <a class="store-link" href="./index.html">Colecciones</a>
              <label for="dropdown-colecciones" class="store-dropdown__arrow" aria-label="Mostrar opciones de Colecciones">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </label>
              <ul class="store-submenu">
                <li><a href="./index.html">Colección 1</a></li>
                <li><a href="./index.html">Colección 2</a></li>
                <li><a href="./index.html">Colección 3</a></li>
              </ul>
            </div>

            <a class="store-link" href="./index.html">Personalizados</a>
            <a class="store-link" href="./about.html">Nosotros</a>
            <a class="store-link" href="./contacto.html">Contacto</a>
          </div>

          <form class="store-search" role="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            >
          </form>

          <div class="store-actions">
            <a class="store-action" href="./index.html" aria-label="Mi cuenta">
              <svg viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.6"
                   stroke-linecap="round" stroke-linejoin="round"
                   aria-hidden="true">
                <circle cx="12" cy="8" r="3.5"></circle>
                <path d="M5.5 20a6.5 6.5 0 0 1 13 0"></path>
              </svg>
            </a>

            <a class="store-action" href="./index.html" aria-label="Favoritos">
              <svg viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.6"
                   stroke-linecap="round" stroke-linejoin="round"
                   aria-hidden="true">
                <path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"></path>
              </svg>
            </a>

            <button id="btn-abrir-carrito" class="store-action btn-carrito" type="button" aria-label="Carrito">
              <svg viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.6"
                   stroke-linecap="round" stroke-linejoin="round"
                   aria-hidden="true">
                <rect x="4.5" y="8" width="15" height="12.5" rx="2"></rect>
                <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
              </svg>
            </button>
          </div>
        </div>

        <label for="menu-toggle" class="mobile-menu-toggle" aria-label="Abrir menú">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </label>
      </nav>
    </header>
  `;
}