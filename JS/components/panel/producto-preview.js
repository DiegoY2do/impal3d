/* ==========================================================================
   [INICIO] VISTA PREVIA DE LA TARJETA
   ========================================================================== */
import { icono } from './iconos.js';
import { esc, dinero } from './util.js';

export function renderPreview() {
    return `
    <section class="pn-card">
        <h2>Vista previa de la tarjeta</h2>
        <article class="pv-tarjeta">
            <div class="pv-img">
                <img alt="" hidden data-pv-img>
                <span class="pv-vacio" data-pv-vacio>Sin imagen</span>
                <span class="pv-badge pv-badge--nuevo" data-pv-nuevo hidden>Nuevo</span>
                <span class="pv-badge pv-badge--agotado" data-pv-agotado hidden>Agotado</span>
                <span class="pv-fav">${icono('corazon', 18)}</span>
            </div>
            <div class="pv-cuerpo">
                <small class="pv-cat" data-pv-cat></small>
                <strong class="pv-nombre" data-pv-nombre></strong>
                <div class="pv-rating" data-pv-rating></div>
                <div class="pv-pie">
                    <div class="pv-precios">
                        <span class="pv-precio" data-pv-precio></span>
                        <span class="pn-pill pn-pill--acento" data-pv-desc hidden></span>
                    </div>
                    <span class="pv-carrito">${icono('bolsa', 18)}</span>
                </div>
            </div>
        </article>
    </section>`;
}

export function actualizarPreview(root, d) {
    const q = (s) => root.querySelector(s);

    const img = q('[data-pv-img]');
    if (d.imagen) {
        if (img.getAttribute('src') !== d.imagen) img.src = d.imagen;
        img.hidden = false;
        q('[data-pv-vacio]').hidden = true;
    } else {
        img.hidden = true;
        img.removeAttribute('src');
        q('[data-pv-vacio]').hidden = false;
    }

    q('[data-pv-nuevo]').hidden = !d.nuevo;
    q('[data-pv-agotado]').hidden = !d.agotado;
    q('[data-pv-cat]').textContent = d.categoria || 'Categoría';
    q('[data-pv-nombre]').textContent = d.nombre || 'Nombre del producto';
    q('[data-pv-rating]').innerHTML = d.resenas > 0
        ? `<span class="pv-estrella">★</span> <b>${Number(d.rating).toFixed(1)}</b> <span>(${esc(d.resenas)})</span>`
        : '<span>Sin reseñas todavía</span>';
    q('[data-pv-precio]').textContent = dinero(d.precio);

    const desc = q('[data-pv-desc]');
    desc.hidden = !(d.desc > 0);
    desc.textContent = d.desc > 0 ? `-${d.desc}%` : '';
}

/* [FIN] VISTA PREVIA DE LA TARJETA */