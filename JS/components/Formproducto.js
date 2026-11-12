/* ==========================================================================
   [INICIO] FORMULARIO DE PRODUCTOS — #formproducto
   Genera objetos con la misma forma que data/productos.json:
   id, nombre, colecciones, categoria, precio, rating, resenas,
   [agotado], [nuevo], [desc], descripcion, tamaño, imagenes
   ========================================================================== */

const JSON_URL = 'data/productos.json';  
const IMG_BASE = './assets/img/productos/';  

const CATEGORIAS = ['Terror', 'Anime', 'Videojuegos'];
const COLECCIONES = [
    { valor: 'destacados', etiqueta: 'Destacados' },
    { valor: 'ofertas', etiqueta: 'Ofertas' }
];

export function renderFormProducto() {
    return `
    <section class="form-producto">
        <div class="container-max">

            <div class="fp-head">
                <div class="badge-morado">Catálogo</div>
                <h2>Agregar producto</h2>
                <p>Llena los datos y se agregará a <code>productos.json</code> con la estructura del catálogo.</p>
            </div>

            <div class="fp-layout">
                <form class="fp-form" novalidate>

                    <div class="fp-card" role="group" aria-label="Información">
                        <h3 class="fp-titulo">Información</h3>
                        <div class="fp-grid">
                            <div class="fp-field fp-id">
                                <label class="fp-label" for="fp-id">Id</label>
                                <input class="fp-input" id="fp-id" name="id" type="number" readonly>
                            </div>
                            <div class="fp-field fp-span">
                                <label class="fp-label" for="fp-nombre">Nombre *</label>
                                <input class="fp-input" id="fp-nombre" name="nombre" type="text" placeholder="Ej. Pennywise" autocomplete="off">
                                <small class="fp-error" data-error="nombre"></small>
                            </div>
                            <div class="fp-field fp-full">
                                <label class="fp-label" for="fp-descripcion">Descripción *</label>
                                <textarea class="fp-input" id="fp-descripcion" name="descripcion" rows="3" placeholder="Texto que se verá en la tarjeta del producto"></textarea>
                                <small class="fp-error" data-error="descripcion"></small>
                            </div>
                            <div class="fp-field">
                                <label class="fp-label" for="fp-tamano">Tamaño *</label>
                                <input class="fp-input" id="fp-tamano" name="tamano" type="text" inputmode="decimal" placeholder="5">
                                <small class="fp-error" data-error="tamano"></small>
                            </div>
                        </div>
                    </div>

                    <div class="fp-card" role="group" aria-label="Precio y métricas">
                        <h3 class="fp-titulo">Precio y métricas</h3>
                        <div class="fp-grid fp-grid-4">
                            <div class="fp-field">
                                <label class="fp-label" for="fp-precio">Precio (MXN) *</label>
                                <input class="fp-input" id="fp-precio" name="precio" type="number" min="0" step="any" placeholder="50">
                                <small class="fp-error" data-error="precio"></small>
                            </div>
                            <div class="fp-field">
                                <label class="fp-label" for="fp-desc">Descuento (%)</label>
                                <input class="fp-input" id="fp-desc" name="desc" type="number" min="0" max="99" step="1" placeholder="Sin descuento">
                                <small class="fp-error" data-error="desc"></small>
                            </div>
                            <div class="fp-field">
                                <label class="fp-label" for="fp-rating">Rating (0–5) *</label>
                                <input class="fp-input" id="fp-rating" name="rating" type="number" min="0" max="5" step="0.1" value="0">
                                <small class="fp-error" data-error="rating"></small>
                            </div>
                            <div class="fp-field">
                                <label class="fp-label" for="fp-resenas">Reseñas *</label>
                                <input class="fp-input" id="fp-resenas" name="resenas" type="number" min="0" step="1" value="0">
                                <small class="fp-error" data-error="resenas"></small>
                            </div>
                        </div>
                    </div>

                    <div class="fp-card" role="group" aria-label="Clasificación">
                        <h3 class="fp-titulo">Clasificación</h3>
                        <div class="fp-field">
                            <label class="fp-label" for="fp-categoria">Categoría *</label>
                            <select class="fp-input" id="fp-categoria" name="categoria">
                                <option value="" disabled selected>Selecciona una categoría</option>
                                ${CATEGORIAS.map(c => `<option value="${c}">${c}</option>`).join('')}
                            </select>
                            <small class="fp-error" data-error="categoria"></small>
                        </div>

                        <div class="fp-field">
                            <span class="fp-label">Colecciones</span>
                            <div class="fp-chips">
                                ${COLECCIONES.map(c => `
                                <label class="fp-chip">
                                    <input type="checkbox" class="fp-coleccion" value="${c.valor}">
                                    <span>${c.etiqueta}</span>
                                </label>`).join('')}
                            </div>
                            <small class="fp-hint">La categoría se agrega sola como primera colección.</small>
                        </div>

                        <div class="fp-field">
                            <span class="fp-label">Etiquetas</span>
                            <div class="fp-chips">
                                <label class="fp-chip"><input type="checkbox" name="nuevo"><span>Nuevo</span></label>
                                <label class="fp-chip"><input type="checkbox" name="agotado"><span>Agotado</span></label>
                            </div>
                        </div>
                    </div>

                    <div class="fp-card" role="group" aria-label="Imágenes">
                        <h3 class="fp-titulo">Imágenes *</h3>
                        <div class="fp-subir">
                            <label class="btn-secundary fp-archivo">
                                Elegir archivos
                                <input type="file" name="archivos" accept="image/webp,image/png,image/jpeg" multiple hidden>
                            </label>
                            <div class="fp-url">
                                <input class="fp-input" name="imagenUrl" type="url" placeholder="o pega una URL https://…">
                                <button type="button" class="btn-secundary fp-url-add">Agregar</button>
                            </div>
                        </div>
                        <div class="fp-imagenes"></div>
                        <small class="fp-hint">Se guarda la ruta <code>${IMG_BASE}archivo.webp</code>. Copia la imagen a esa carpeta del proyecto.</small>
                        <small class="fp-error" data-error="imagenes"></small>
                    </div>

                    <div class="fp-actions">
                        <button type="submit" class="btn-primary fp-guardar">Guardar producto</button>
                        <button type="button" class="btn-secundary fp-conectar">Elegir productos.json</button>
                        <button type="button" class="btn-secundary fp-copiar">Copiar JSON</button>
                        <button type="reset" class="btn-secundary">Limpiar</button>
                    </div>
                    <p class="fp-estado" role="status" aria-live="polite"></p>
                </form>

                <aside class="fp-preview">
                    <div class="fp-card">
                        <h3 class="fp-titulo">Vista previa del JSON</h3>
                        <pre class="fp-json"></pre>
                    </div>
                </aside>
            </div>

        </div>
    </section>
    `;
}

export async function initFormProducto() {
    const root = document.querySelector('#formproducto');
    if (!root) return;

    const form = root.querySelector('.fp-form');
    const q = (sel) => root.querySelector(sel);
    const campo = (nombre) => form.elements[nombre];

    let productos = [];
    let imagenes = []; // { ruta, vista }

    const siguienteId = () => productos.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1;

    function aviso(texto, tipo = 'ok') {
        const el = q('.fp-estado');
        el.textContent = texto;
        el.dataset.tipo = tipo;
    }

    // ---------- Catálogo actual (para calcular el siguiente id) ----------
    try {
        const res = await fetch(JSON_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(res.status);
        productos = await res.json();
    } catch {
        aviso('No pude leer data/productos.json. Usa "Elegir productos.json" para conectarlo.', 'aviso');
    }

    // ---------- Lectura del formulario (mismo orden de claves que el JSON) ----------
    function leerProducto() {
        const categoria = campo('categoria').value;
        const marcadas = [...root.querySelectorAll('.fp-coleccion:checked')].map(c => c.value);
        const desc = Number(campo('desc').value);

        const p = {
            id: Number(campo('id').value),
            nombre: campo('nombre').value.trim(),
            colecciones: [...new Set([categoria, ...marcadas].filter(Boolean))],
            categoria,
            precio: Number(campo('precio').value),
            rating: Number(campo('rating').value),
            resenas: Number(campo('resenas').value)
        };
        if (campo('agotado').checked) p.agotado = true;
        if (campo('nuevo').checked) p.nuevo = true;
        if (desc > 0) p.desc = desc;
        p.descripcion = campo('descripcion').value.trim();
        p['tamaño'] = campo('tamano').value.trim();
        p.imagenes = imagenes.map(i => i.ruta);
        return p;
    }

    function validar(p) {
        const e = {};
        if (!p.nombre) e.nombre = 'El nombre es obligatorio.';
        if (!p.categoria) e.categoria = 'Elige una categoría.';
        if (campo('precio').value === '' || !(p.precio > 0)) e.precio = 'Escribe un precio mayor a 0.';
        if (campo('desc').value !== '' && !(p.desc >= 1 && p.desc <= 99)) e.desc = 'Debe estar entre 1 y 99.';
        if (p.colecciones.includes('ofertas') && !p.desc) e.desc = 'Si está en "ofertas" necesita descuento.';
        if (!(p.rating >= 0 && p.rating <= 5)) e.rating = 'Debe estar entre 0 y 5.';
        if (!Number.isInteger(p.resenas) || p.resenas < 0) e.resenas = 'Número entero de 0 en adelante.';
        if (!p.descripcion) e.descripcion = 'La descripción es obligatoria.';
        if (!p['tamaño']) e.tamano = 'Indica el tamaño.';
        if (!p.imagenes.length) e.imagenes = 'Agrega al menos una imagen.';
        if (productos.some(x => x.id === p.id)) e.nombre = 'Ese Id ya existe; recarga la página.';
        return e;
    }

    function mostrarErrores(errores) {
        root.querySelectorAll('[data-error]').forEach(el => {
            el.textContent = errores[el.dataset.error] || '';
        });
    }

    function actualizarJson() {
        q('.fp-json').textContent = JSON.stringify(leerProducto(), null, 4);
    }

    // ---------- Imágenes ----------
    function pintarImagenes() {
        q('.fp-imagenes').innerHTML = imagenes.map((im, i) => `
            <figure class="fp-thumb">
                <img src="${esc(im.vista)}" alt="">
                <figcaption title="${esc(im.ruta)}">${esc(im.ruta.split('/').pop())}</figcaption>
                <button type="button" class="fp-quitar" data-i="${i}" aria-label="Quitar imagen">✕</button>
            </figure>`).join('');
        actualizarJson();
    }

    function agregarImagen(ruta, vista) {
        if (imagenes.some(i => i.ruta === ruta)) return;
        imagenes.push({ ruta, vista });
    }

    campo('archivos').addEventListener('change', (e) => {
        [...e.target.files].forEach(f => {
            agregarImagen(IMG_BASE + f.name, URL.createObjectURL(f));
            if (!/\.webp$/i.test(f.name)) {
                aviso('Las imágenes de tu catálogo son .webp; considera convertir las que no lo sean.', 'aviso');
            }
        });
        e.target.value = '';
        pintarImagenes();
    });

    function agregarUrl() {
        const valor = campo('imagenUrl').value.trim();
        if (!valor) return;
        try { new URL(valor); } catch { return aviso('Esa URL no es válida.', 'error'); }
        agregarImagen(valor, valor);
        campo('imagenUrl').value = '';
        pintarImagenes();
    }
    q('.fp-url-add').addEventListener('click', agregarUrl);
    campo('imagenUrl').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); agregarUrl(); }
    });

    q('.fp-imagenes').addEventListener('click', (e) => {
        const btn = e.target.closest('.fp-quitar');
        if (!btn) return;
        imagenes.splice(Number(btn.dataset.i), 1);
        pintarImagenes();
    });

    // ---------- Guardado en productos.json ----------
    const soportaArchivos = 'showOpenFilePicker' in window;
    let archivo = null; // handle del productos.json elegido

    async function conectarArchivo() {
        try {
            const [h] = await window.showOpenFilePicker({
                types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
                excludeAcceptAllOption: true,
                multiple: false
            });
            if ((await h.requestPermission({ mode: 'readwrite' })) !== 'granted') {
                throw new Error('Sin permiso para editar el archivo.');
            }
            const data = JSON.parse(await (await h.getFile()).text());
            if (!Array.isArray(data)) throw new Error('El archivo no es un arreglo de productos.');
            archivo = h;
            productos = data;
            campo('id').value = siguienteId();
            q('.fp-conectar').textContent = 'Conectado: ' + h.name;
            actualizarJson();
            aviso(`Conectado a ${h.name} (${data.length} productos).`);
        } catch (err) {
            if (err.name === 'SecurityError' || err.name === 'NotAllowedError') {
                aviso('Este navegador no permite editar el archivo; se descargará el JSON actualizado.', 'aviso');
                return;
            }
            throw err;
        }
    }

    async function escribirArchivo(lista) {
        const w = await archivo.createWritable();
        await w.write(serializar(lista));
        await w.close();
    }

    function descargar(lista) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([serializar(lista)], { type: 'application/json' }));
        a.download = 'productos.json';
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }

    q('.fp-conectar').addEventListener('click', async () => {
        try { await conectarArchivo(); }
        catch (err) { if (err.name !== 'AbortError') aviso(`No pude abrir el archivo: ${err.message}`, 'error'); }
    });

    // ---------- Eventos ----------
    form.addEventListener('input', actualizarJson);
    form.addEventListener('change', actualizarJson);

    // Un descuento mayor a 0 marca "ofertas" solo
    campo('desc').addEventListener('input', () => {
        const ofertas = root.querySelector('.fp-coleccion[value="ofertas"]');
        if (ofertas && Number(campo('desc').value) > 0) ofertas.checked = true;
    });

    q('.fp-copiar').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(leerProducto(), null, 4));
            aviso('JSON copiado al portapapeles.');
        } catch {
            aviso('No pude copiar; selecciona el texto de la vista previa.', 'error');
        }
    });

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const p = leerProducto();
        const errores = validar(p);
        mostrarErrores(errores);
        if (Object.keys(errores).length) return aviso('Revisa los campos marcados.', 'error');

        const btn = q('.fp-guardar');
        btn.disabled = true;
        aviso('Guardando…');
        try {
            if (soportaArchivos && !archivo) await conectarArchivo();
            if (archivo) p.id = siguienteId(); // id real según el archivo conectado

            const lista = [...productos, p];
            let mensaje;
            if (archivo) {
                await escribirArchivo(lista);
                mensaje = `Producto "${p.nombre}" guardado en ${archivo.name} con Id ${p.id}.`;
            } else {
                descargar(lista);
                mensaje = `Se descargó productos.json con "${p.nombre}" (Id ${p.id}). Reemplaza data/productos.json.`;
            }
            productos = lista;
            form.reset();
            aviso(mensaje, archivo ? 'ok' : 'aviso');
        } catch (err) {
            if (err.name === 'AbortError') aviso('Cancelaste la selección del archivo; no se guardó nada.', 'aviso');
            else aviso(`No se pudo guardar: ${err.message}`, 'error');
        } finally {
            btn.disabled = false;
        }
    });

    form.addEventListener('reset', () => setTimeout(() => {
        imagenes = [];
        campo('id').value = siguienteId();
        mostrarErrores({});
        pintarImagenes();
    }, 0));

    // ---------- Arranque ----------
    campo('id').value = siguienteId();
    pintarImagenes();
}

// Mismo formato que el archivo original: 4 espacios y rating siempre con un decimal (5.0)
function serializar(lista) {
    const json = JSON.stringify(lista, (k, v) => {
        if (k === 'rating' && typeof v === 'number') {
            const d = Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? v.toFixed(1) : String(v);
            return `__R${d}__`;
        }
        return v;
    }, 4);
    return json.replace(/"__R([\d.]+)__"/g, '$1') + '\n';
}

function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* [FIN] FORMULARIO DE PRODUCTOS */