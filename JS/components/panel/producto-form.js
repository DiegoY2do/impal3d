/* ==========================================================================
   [INICIO] PANTALLA DE PRODUCTO — agregar (#/productos/nuevo) y editar (#/productos/12)
   Guarda con la misma forma que data/productos.json:
   id, nombre, colecciones, categoria, precio, rating, resenas,
   [agotado], [nuevo], [desc], descripcion, tamaño, imagenes
   ========================================================================== */
import { leerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../../panel-datos.js';
import { recargar } from '../../panel-router.js';
import { montarTopbar } from './topbar.js';
import { renderImagenes, initImagenes } from './producto-imagenes.js';
import { renderPreview, actualizarPreview } from './producto-preview.js';
import { toast } from './toast.js';
import { icono } from './iconos.js';
import { esc } from './util.js';

const CATEGORIAS_BASE = ['Terror', 'Anime', 'Videojuegos'];
const MAX_DESCRIPCION = 500;

export async function montarProductoForm(contenedor, id, vigente) {
    const productos = await leerProductos();
    if (!vigente()) return;

    const existente = id == null ? null : productos.find(p => p.id === id) || null;

    if (id != null && !existente) {
        montarTopbar({ volver: '#/productos', titulo: 'Producto no encontrado', subtitulo: 'Productos / Editar' });
        contenedor.innerHTML = `
            <section class="pn-card">
                <h2>No existe el producto ${id}</h2>
                <p class="pn-hint">Puede que lo hayas eliminado. <a href="#/productos">Volver a la lista</a></p>
            </section>`;
        return;
    }

    const categorias = [...new Set([...CATEGORIAS_BASE, ...productos.map(p => p.categoria)].filter(Boolean))];
    const colecciones = [...new Set(productos.flatMap(p => p.colecciones || []))];

    montarTopbar(existente
        ? {
            volver: '#/productos',
            titulo: existente.nombre,
            subtitulo: `Productos / Editar · ID ${existente.id}`,
            acciones: [
                { texto: 'Ver en la tienda', href: './index.html', nuevaPestana: true },
                { texto: 'Guardar cambios', tipo: 'primario', submit: true, form: 'pf-form' }
            ]
        }
        : {
            volver: '#/productos',
            titulo: 'Nuevo producto',
            subtitulo: 'Productos / Agregar',
            acciones: [{ texto: 'Guardar producto', tipo: 'primario', submit: true, form: 'pf-form' }]
        });

    contenedor.innerHTML = renderProductoForm({ existente, categorias });
    initProductoForm(contenedor, { existente, colecciones });
}

export function renderProductoForm({ existente, categorias }) {
    const v = existente || {};
    const destacado = (v.colecciones || []).includes('destacados');
    const opciones = categorias
        .map(c => `<option value="${esc(c)}"${v.categoria === c ? ' selected' : ''}>${esc(c)}</option>`)
        .join('');

    return `
    <form id="pf-form" class="pf-layout" novalidate autocomplete="off">

        <div class="pf-col-principal">
            <section class="pn-card">
                <h2>Información general</h2>
                <div class="pn-campo">
                    <label for="pf-nombre">Nombre del producto</label>
                    <input class="pn-input" id="pf-nombre" name="nombre" type="text" value="${esc(v.nombre)}" placeholder="Ej. Pennywise">
                    <small class="pn-error" data-error="nombre"></small>
                </div>
                <div class="pn-campo">
                    <label for="pf-descripcion">Descripción</label>
                    <textarea class="pn-input" id="pf-descripcion" name="descripcion" rows="4" maxlength="${MAX_DESCRIPCION}" placeholder="Texto que se verá en la tienda">${esc(v.descripcion)}</textarea>
                    <div class="pn-pie-campo">
                        <small class="pn-error" data-error="descripcion"></small>
                        <span class="pn-contador" data-contador></span>
                    </div>
                </div>
                <div class="pn-campo pn-campo--corto">
                    <label for="pf-tamano">Tamaño</label>
                    <input class="pn-input" id="pf-tamano" name="tamano" type="text" inputmode="decimal" value="${esc(v['tamaño'])}" placeholder="5">
                    <small class="pn-error" data-error="tamano"></small>
                </div>
            </section>

            ${renderImagenes()}

            <section class="pn-card">
                <h2>Precio</h2>
                <div class="pn-grid-2">
                    <div class="pn-campo">
                        <label for="pf-precio">Precio (MXN)</label>
                        <input class="pn-input" id="pf-precio" name="precio" type="number" min="0" step="any" value="${esc(v.precio)}" placeholder="50">
                        <small class="pn-error" data-error="precio"></small>
                    </div>
                    <div class="pn-campo">
                        <label for="pf-desc">Descuento (%)</label>
                        <input class="pn-input" id="pf-desc" name="desc" type="number" min="0" max="99" step="1" value="${esc(v.desc)}" placeholder="Sin descuento">
                        <small class="pn-error" data-error="desc"></small>
                    </div>
                </div>
                <p class="pn-hint">Si pones descuento, el producto se agrega solo a la colección «ofertas».</p>
            </section>
        </div>

        <aside class="pf-col-lateral">
            <section class="pn-card">
                <h2>Estado</h2>
                <div class="pn-select-estado">
                    <i class="pn-punto" data-punto></i>
                    <select class="pn-input" name="estado" aria-label="Estado">
                        <option value="activo"${v.agotado ? '' : ' selected'}>Activo</option>
                        <option value="agotado"${v.agotado ? ' selected' : ''}>Agotado</option>
                    </select>
                </div>
                <p class="pn-hint" data-estado-hint></p>
            </section>

            <section class="pn-card">
                <h2>Organización</h2>
                <div class="pn-campo">
                    <label for="pf-categoria">Categoría</label>
                    <select class="pn-input" id="pf-categoria" name="categoria">
                        <option value="" disabled${v.categoria ? '' : ' selected'}>Selecciona una categoría</option>
                        ${opciones}
                        <option value="__nueva__">+ Nueva categoría…</option>
                    </select>
                    <input class="pn-input" name="categoriaNueva" type="text" placeholder="Nombre de la nueva categoría" aria-label="Nueva categoría" hidden>
                    <small class="pn-error" data-error="categoria"></small>
                </div>
                <div class="pn-campo">
                    <span class="pn-etiqueta">Colecciones y etiquetas</span>
                    <div class="pn-chips" data-chips></div>
                    <datalist id="pf-colecciones-lista"></datalist>
                    <small class="pn-hint">La categoría y «Destacar en inicio» se agregan solas a las colecciones.</small>
                </div>
                <div class="pn-toggles">
                    <label class="pn-toggle">
                        <span>Mostrar insignia «Nuevo»</span>
                        <input type="checkbox" name="nuevo" role="switch"${v.nuevo ? ' checked' : ''}><i></i>
                    </label>
                    <label class="pn-toggle">
                        <span>Destacar en inicio</span>
                        <input type="checkbox" name="destacado" role="switch"${destacado ? ' checked' : ''}><i></i>
                    </label>
                </div>
            </section>

            ${renderPreview()}

            ${existente ? '<button type="button" class="pf-eliminar" data-eliminar>Eliminar producto</button>' : ''}
        </aside>
    </form>`;
}

function initProductoForm(root, { existente, colecciones }) {
    const form = root.querySelector('#pf-form');
    const campo = (n) => form.elements[n];
    const $ = (s) => form.querySelector(s);

    // Colecciones extra (sin la categoría ni "destacados", que salen de otros controles)
    let chips = existente
        ? (existente.colecciones || []).filter(c => c !== existente.categoria && c !== 'destacados')
        : [];

    $('#pf-colecciones-lista').innerHTML = colecciones
        .filter(c => c !== 'destacados')
        .map(c => `<option value="${esc(c)}"></option>`)
        .join('');

    const imgs = initImagenes(root, {
        iniciales: existente?.imagenes || [],
        onCambio: () => {
            if (imgs.cantidad()) form.querySelector('[data-error="imagenes"]').textContent = '';
            refrescar();
        },
        onAviso: (t) => toast(t, 'aviso')
    });

    // ---------- Lectura del formulario ----------
    function categoriaElegida() {
        return campo('categoria').value === '__nueva__'
            ? campo('categoriaNueva').value.trim()
            : campo('categoria').value;
    }

    function leerProducto() {
        const categoria = categoriaElegida();
        const desc = Number(campo('desc').value);
        const p = {
            nombre: campo('nombre').value.trim(),
            colecciones: [...new Set([
                categoria,
                ...(campo('destacado').checked ? ['destacados'] : []),
                ...chips
            ].filter(Boolean))],
            categoria,
            precio: Number(campo('precio').value),
            rating: existente?.rating ?? 0,     // no se editan aquí: vienen de las reseñas
            resenas: existente?.resenas ?? 0
        };
        if (campo('estado').value === 'agotado') p.agotado = true;
        if (campo('nuevo').checked) p.nuevo = true;
        if (desc > 0) p.desc = desc;
        p.descripcion = campo('descripcion').value.trim();
        p['tamaño'] = campo('tamano').value.trim();
        return p;
    }

    function validar(p) {
        const e = {};
        const descTexto = campo('desc').value;
        const descNum = Number(descTexto);
        if (!p.nombre) e.nombre = 'El nombre es obligatorio.';
        if (!p.descripcion) e.descripcion = 'La descripción es obligatoria.';
        if (!p['tamaño']) e.tamano = 'Indica el tamaño.';
        if (!p.categoria) e.categoria = 'Elige o escribe una categoría.';
        if (campo('precio').value === '' || !(p.precio > 0)) e.precio = 'Escribe un precio mayor a 0.';
        if (descTexto !== '' && descNum !== 0 && !(Number.isInteger(descNum) && descNum >= 1 && descNum <= 99)) {
            e.desc = 'Debe ser un número entero entre 1 y 99.';
        } else if (p.colecciones.includes('ofertas') && !p.desc) {
            e.desc = 'Está en «ofertas»: pon un descuento o quita esa colección.';
        }
        if (!imgs.cantidad()) e.imagenes = 'Agrega al menos una imagen.';
        return e;
    }

    function mostrarErrores(errores) {
        form.querySelectorAll('[data-error]').forEach(el => {
            el.textContent = errores[el.dataset.error] || '';
        });
        const primero = form.querySelector('[data-error]:not(:empty)');
        primero?.closest('.pn-campo, .pn-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ---------- Colecciones (chips) ----------
    function pintarChips() {
        $('[data-chips]').innerHTML = chips.map(c => `
            <span class="pn-chip">${esc(c)}
                <button type="button" data-quitar-col="${esc(c)}" aria-label="Quitar ${esc(c)}">${icono('x', 12)}</button>
            </span>`).join('') +
            `<button type="button" class="pn-chip pn-chip--add" data-agregar-col>${icono('plus', 12)} Agregar</button>`;
    }

    $('[data-chips]').addEventListener('click', (e) => {
        const quitar = e.target.closest('[data-quitar-col]');
        if (quitar) {
            chips = chips.filter(c => c !== quitar.dataset.quitarCol);
            pintarChips();
            refrescar();
            return;
        }
        const agregar = e.target.closest('[data-agregar-col]');
        if (!agregar) return;

        const input = document.createElement('input');
        input.className = 'pn-chip-input';
        input.setAttribute('list', 'pf-colecciones-lista');
        input.setAttribute('aria-label', 'Nueva colección');
        input.placeholder = 'Nueva colección';
        agregar.replaceWith(input);
        input.focus();

        let hecho = false;
        const terminar = (guardar) => {
            if (hecho) return;
            hecho = true;
            const valor = input.value.trim();
            if (guardar && valor && !chips.some(c => c.toLowerCase() === valor.toLowerCase())) chips.push(valor);
            pintarChips();
            refrescar();
        };
        input.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') { ev.preventDefault(); terminar(true); }
            else if (ev.key === 'Escape') { ev.preventDefault(); terminar(false); }
        });
        input.addEventListener('blur', () => terminar(true));
    });

    // Un descuento mayor a 0 agrega "ofertas"
    campo('desc').addEventListener('input', () => {
        if (Number(campo('desc').value) > 0 && !chips.includes('ofertas')) {
            chips.push('ofertas');
            pintarChips();
        }
    });

    campo('categoria').addEventListener('change', () => {
        const nueva = campo('categoria').value === '__nueva__';
        campo('categoriaNueva').hidden = !nueva;
        if (nueva) campo('categoriaNueva').focus();
    });

    // ---------- Vista previa, contador y estado ----------
    function refrescar() {
        const p = leerProducto();
        actualizarPreview(root, { ...p, imagen: imgs.vistaPrincipal() });

        $('[data-contador]').textContent = `${campo('descripcion').value.length} / ${MAX_DESCRIPCION}`;

        const agotado = campo('estado').value === 'agotado';
        $('[data-punto]').classList.toggle('pn-punto--agotado', agotado);
        $('[data-estado-hint]').textContent = agotado
            ? 'Se muestra en la tienda marcado como agotado.'
            : 'Disponible para comprar en la tienda.';
    }

    // Al corregir un campo se borra su mensaje de error
    const limpiarError = (e) => {
        const err = e.target.closest('.pn-campo')?.querySelector('[data-error]');
        if (err) err.textContent = '';
    };
    form.addEventListener('input', (e) => { limpiarError(e); refrescar(); });
    form.addEventListener('change', (e) => { limpiarError(e); refrescar(); });

    // ---------- Guardar ----------
    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const p = leerProducto();
        const errores = validar(p);
        mostrarErrores(errores);
        if (Object.keys(errores).length) {
            toast('Revisa los campos marcados.', 'error');
            return;
        }

        const botones = document.querySelectorAll('button[form="pf-form"]');
        botones.forEach(b => { b.disabled = true; });
        try {
            p.imagenes = await imgs.obtenerRutas();
            if (existente) {
                await actualizarProducto(existente.id, p);
                toast('Cambios guardados.');
                await recargar();
            } else {
                const r = await crearProducto(p);
                toast(`Producto creado con ID ${r.id}.`);
                location.hash = `#/productos/${r.id}`;
            }
        } catch (err) {
            toast(err.message, 'error');
        } finally {
            botones.forEach(b => { b.disabled = false; });
        }
    });

    // ---------- Eliminar ----------
    $('[data-eliminar]')?.addEventListener('click', async () => {
        if (!confirm(`¿Eliminar "${existente.nombre}"? Esta acción no se puede deshacer.`)) return;
        try {
            await eliminarProducto(existente.id);
            toast('Producto eliminado.');
            location.hash = '#/productos';
        } catch (err) {
            toast(err.message, 'error');
        }
    });

    pintarChips();
    refrescar();
}

/* [FIN] PANTALLA DE PRODUCTO */