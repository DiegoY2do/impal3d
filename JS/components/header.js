
export function renderNavbar() {
  return `
    <header class="site-header">
      <div class="announcement-bar">
        <p>
          Envío gratis en compras mayores a $999 MXN
          · Usa el código <strong>BIENVENIDO</strong>
        </p>
      </div>

      <nav class="store-navbar" aria-label="Navegación principal">
        <a class="store-logo" href="index.html" aria-label="Inicio">
          <img
        src="./assets/img/brand/logo-imp-al3d-negro.svg"
        alt="Logo de Impal3D"
        style="width: 180px; height: auto;"
        >
        </a>
        <button class="mobile-menu-toggle" type="button"
        aria-label="Abrir menú"
        aria-expanded="false">
        ☰
        </button>

        <div class="store-links">
          <a class="store-link active" href="index.html">Inicio</a>

          <div class="store-dropdown">
            <a class="store-link" href="#productos">Productos</a>
          </div>

          <a class="store-link" href="#colecciones">Colecciones</a>
          <a class="store-link" href="#personalizados">Personalizados</a>
          <a class="store-link" href="about.html">Nosotros</a>
          <a class="store-link" href="#contacto">Contacto</a>
        </div>

        <form class="store-search" role="search">
          <input
            type="search"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
          >
        </form>

        

<div class="store-actions">
  <!-- Mi cuenta -->
  <a href="#cuenta" aria-label="Mi cuenta">
    <svg viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.6"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <circle cx="12" cy="8" r="3.5"></circle>
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0"></path>
    </svg>
  </a>

  <!-- Favoritos -->
  <a href="#favoritos" aria-label="Favoritos">
    <svg viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.6"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"></path>
    </svg>
  </a>

  <!-- Carrito -->
  <a href="#carrito" aria-label="Carrito">
    <svg viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.6"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <rect x="4.5" y="8" width="15" height="12.5" rx="2"></rect>
      <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
    </svg>
  </a>
</div>


      </nav>
    </header>
  `;
}

