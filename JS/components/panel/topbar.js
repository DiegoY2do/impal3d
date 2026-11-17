/* ==========================================================================
   [INICIO] BARRA SUPERIOR — #panel-topbar
   Cada pantalla llama a montarTopbar() con su título y sus botones.
   ========================================================================== */
import { icono } from './iconos.js';
import { esc } from './util.js';

/**
 * @param {object}  o
 * @param {string}  [o.volver]     hash al que regresa la flecha (si se omite, no hay flecha)
 * @param {string}  o.titulo
 * @param {string}  [o.subtitulo]
 * @param {Array}   [o.acciones]   { texto (HTML interno), tipo:'primario'|'secundario', href?, nuevaPestana?, submit?, form? }
 */
export function montarTopbar({ volver, titulo, subtitulo = '', acciones = [] }) {
    const el = document.getElementById('panel-topbar');
    document.title = `${titulo} | IMP AL3D Panel`;
    el.innerHTML = `
        <button type="button" class="panel-burger" aria-label="Abrir menú">${icono('menu', 22)}</button>
        ${volver ? `<a class="pn-volver" href="${volver}" aria-label="Volver">${icono('chevron-izq', 20)}</a>` : ''}
        <div class="pn-topbar__titulo">
            <h1>${esc(titulo)}</h1>
            ${subtitulo ? `<p>${esc(subtitulo)}</p>` : ''}
        </div>
        <div class="pn-topbar__acciones">${acciones.map(boton).join('')}</div>`;
    return el;
}

function boton(a) {
    const clase = `pn-btn ${a.tipo === 'primario' ? 'pn-btn--primario' : 'pn-btn--secundario'}`;
    if (a.href) {
        const extra = a.nuevaPestana ? ' target="_blank" rel="noopener"' : '';
        return `<a class="${clase}" href="${a.href}"${extra}>${a.texto}</a>`;
    }
    const form = a.form ? ` form="${a.form}"` : '';
    return `<button type="${a.submit ? 'submit' : 'button'}" class="${clase}"${form}>${a.texto}</button>`;
}

/* [FIN] BARRA SUPERIOR */