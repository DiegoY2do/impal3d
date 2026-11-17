/* ==========================================================================
   [INICIO] BARRA LATERAL — #panel-sidebar
   ========================================================================== */
import { icono } from './iconos.js';
import { esc } from './util.js';

// Datos de la persona que administra (cámbialos cuando haya login)
const ADMIN = { nombre: 'Administrador', rol: 'IMP AL3D', iniciales: 'AD' };

const MENU = [
    {
        grupo: 'General',
        items: [
            { clave: 'dashboard', texto: 'Dashboard', icono: 'dashboard' },
            { clave: 'pedidos', texto: 'Pedidos', icono: 'pedidos' },
            { clave: 'productos', texto: 'Productos', icono: 'tag' },
            { clave: 'inventario', texto: 'Inventario', icono: 'capas' }
        ]
    },
    {
        grupo: 'Clientes',
        items: [
            { clave: 'clientes', texto: 'Clientes', icono: 'usuarios' },
            { clave: 'resenas', texto: 'Reseñas', icono: 'estrella' },
            { clave: 'cupones', texto: 'Cupones', icono: 'porcentaje' }
        ]
    },
    {
        grupo: 'Sitio',
        items: [
            { clave: 'contenido', texto: 'Contenido', icono: 'imagen' },
            { clave: 'reportes', texto: 'Reportes', icono: 'grafica' },
            { clave: 'configuracion', texto: 'Configuración', icono: 'ajustes' }
        ]
    }
];

export function renderSidebar() {
    return `
    <div class="pn-marca">
        <img src="assets/img/brand/logo-imp-al3d-blanco.svg" alt="IMP AL3D">
        <span class="pn-badge-admin">Admin</span>
    </div>

    <nav class="pn-nav" aria-label="Secciones">
        ${MENU.map(g => `
            <p class="pn-nav__grupo">${g.grupo}</p>
            ${g.items.map(i => `
                <a class="pn-nav__link" href="#/${i.clave}" data-clave="${i.clave}">
                    ${icono(i.icono, 20)}<span>${i.texto}</span>
                </a>`).join('')}
        `).join('')}
    </nav>

    <div class="pn-sidebar__pie">
        <a class="pn-ver-tienda" href="./index.html" target="_blank" rel="noopener">
            Ver tienda ${icono('externo', 14)}
        </a>
        <div class="pn-usuario">
            <span class="pn-avatar">${esc(ADMIN.iniciales)}</span>
            <div>
                <strong>${esc(ADMIN.nombre)}</strong>
                <small>${esc(ADMIN.rol)}</small>
            </div>
        </div>
    </div>`;
}

export function activarSidebar(clave) {
    document.querySelectorAll('.pn-nav__link').forEach(a => {
        const activo = a.dataset.clave === clave;
        a.classList.toggle('is-activo', activo);
        if (activo) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
    });
}

/* [FIN] BARRA LATERAL */