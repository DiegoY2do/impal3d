import { montarTopbar } from './topbar.js';
import { esc } from './util.js';

const NOMBRES = {
    dashboard: 'Dashboard',
    pedidos: 'Pedidos',
    inventario: 'Inventario',
    clientes: 'Clientes',
    resenas: 'Reseñas',
    cupones: 'Cupones',
    contenido: 'Contenido',
    reportes: 'Reportes',
    configuracion: 'Configuración'
};

export function montarProximamente(contenedor, clave) {
    const nombre = NOMBRES[clave] || 'Sección';
    montarTopbar({ titulo: nombre, subtitulo: 'Próximamente' });
    contenedor.innerHTML = `
        <section class="pn-card pn-vacio-card">
            <h2>${esc(nombre)}</h2>
            <p class="pn-hint">Esta sección todavía no está disponible.</p>
            <p><a class="pn-btn pn-btn--secundario" href="#/productos">Ir a Productos</a></p>
        </section>`;
}