/* ==========================================================================
   [INICIO] LISTA DE PRODUCTOS — #/productos
   ========================================================================== */
import { leerProductos } from '../../panel-datos.js';
import { montarTopbar } from './topbar.js';
import { icono } from './iconos.js';
import { esc, dinero } from './util.js';

const normalizar = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export async function montarProductosLista(contenedor, vigente) {
    const productos = await leerProductos();
    if (!vigente()) return;

    montarTopbar({
        titulo: 'Productos',
        subtitulo: `${productos.length} ${productos.length === 1 ? 'producto' : 'productos'} en el catálogo`,
        acciones: [{ texto: `${icono('plus', 16)} Agregar producto`, href: '#/productos/nuevo', tipo: 'primario' }]
    });

    contenedor.innerHTML = `
    <section class="pn-card pl-card">
        <div class="pl-barra">
            <input type="search" class="pn-input pl-buscar" placeholder="Buscar por nombre o categoría" aria-label="Buscar productos">
        </div>
        <div class="pl-tabla-wrap">
            <table class="pl-tabla">
                <thead>
                    <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th><th><span class="pn-oculto">Acciones</span></th></tr>
                </thead>
                <tbody>${productos.map(fila).join('')}</tbody>
            </table>
        </div>
        <p class="pn-hint pl-vacio" ${productos.length ? 'hidden' : ''}>${productos.length ? 'No hay productos que coincidan.' : 'Todavía no hay productos.'}</p>
    </section>`;

    const filas = [...contenedor.querySelectorAll('tbody tr')];
    const vacio = contenedor.querySelector('.pl-vacio');

    contenedor.querySelector('.pl-buscar').addEventListener('input', (e) => {
        const t = normalizar(e.target.value.trim());
        let visibles = 0;
        filas.forEach(tr => {
            tr.hidden = Boolean(t) && !tr.dataset.buscar.includes(t);
            if (!tr.hidden) visibles++;
        });
        if (productos.length) vacio.hidden = visibles > 0;
    });

    contenedor.querySelector('tbody').addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const tr = e.target.closest('tr[data-href]');
        if (tr) location.hash = tr.dataset.href;
    });
}

function fila(p) {
    const img = p.imagenes?.[0];
    return `
    <tr data-href="#/productos/${p.id}" data-buscar="${esc(normalizar(`${p.nombre} ${p.categoria}`))}">
        <td>
            <div class="pl-prod">
                ${img ? `<img class="pl-thumb" src="${esc(img)}" alt="" loading="lazy">` : '<span class="pl-thumb"></span>'}
                <div>
                    <a href="#/productos/${p.id}">${esc(p.nombre)}</a>
                    <small>ID ${p.id}</small>
                </div>
            </div>
        </td>
        <td>${esc(p.categoria)}</td>
        <td>${dinero(p.precio)}</td>
        <td><div class="pl-etiquetas">${etiquetas(p)}</div></td>
        <td class="pl-accion"><a class="pn-btn pn-btn--secundario pn-btn--sm" href="#/productos/${p.id}">Editar</a></td>
    </tr>`;
}

function etiquetas(p) {
    const e = [p.agotado
        ? '<span class="pn-pill pn-pill--peligro">Agotado</span>'
        : '<span class="pn-pill pn-pill--ok">Activo</span>'];
    if (p.nuevo) e.push('<span class="pn-pill pn-pill--acento">Nuevo</span>');
    if (p.colecciones?.includes('destacados')) e.push('<span class="pn-pill pn-pill--tenue">Destacado</span>');
    if (p.desc > 0) e.push(`<span class="pn-pill pn-pill--acento">-${p.desc}%</span>`);
    return e.join('');
}

/* [FIN] LISTA DE PRODUCTOS */