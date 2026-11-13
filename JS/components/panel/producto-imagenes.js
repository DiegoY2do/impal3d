/* ==========================================================================
   [INICIO] IMÁGENES DEL PRODUCTO
   Subir (se convierten a WebP en el navegador), reordenar arrastrando y quitar.
   Las imágenes nuevas se suben al servidor solo al guardar el producto.
   ========================================================================== */
import { subirImagen } from '../../panel-datos.js';
import { esc } from './util.js';
import { icono } from './iconos.js';

const MIN_LADO = 800;   // recomendación del diseño
const MAX_LADO = 2000;  // se reduce si es más grande, para no subir archivos pesados

export function renderImagenes() {
    return `
    <section class="pn-card">
        <div class="pn-card__cab">
            <h2>Imágenes</h2>
            <span class="pn-hint">Fondo recomendado: Violeta 100 · #E6E2FD · cuadradas, mín. ${MIN_LADO} px</span>
        </div>
        <div class="pi-grid" data-imagenes></div>
        <input type="file" accept="image/*" multiple hidden data-input-imagenes>
        <p class="pn-hint">Arrastra para reordenar. La primera imagen es la de la tarjeta del catálogo. Se convierten a WebP automáticamente.</p>
        <small class="pn-error" data-error="imagenes"></small>
    </section>`;
}

/**
 * @returns {{ cantidad:Function, vistaPrincipal:Function, obtenerRutas:Function }}
 */
export function initImagenes(root, { iniciales = [], onCambio, onAviso } = {}) {
    const grid = root.querySelector('[data-imagenes]');
    const input = root.querySelector('[data-input-imagenes]');

    // { ruta } = ya está en el proyecto · { archivo, nombre } = pendiente de subir
    let items = iniciales.map(ruta => ({ ruta, vista: ruta }));
    let arrastrando = null;

    function pintar(notificar = true) {
        const huecos = Math.max(1, 5 - items.length);
        const tiles = items.map((it, i) => `
            <div class="pi-tile${i === 0 ? ' pi-tile--principal' : ''}" draggable="true" data-i="${i}">
                <img src="${esc(it.vista)}" alt="Imagen ${i + 1}" draggable="false">
                ${i === 0 ? '<span class="pi-badge">Principal</span>' : ''}
                <button type="button" class="pi-quitar" data-quitar="${i}" aria-label="Quitar imagen ${i + 1}">${icono('x', 14)}</button>
            </div>`).join('');
        const subir = Array.from({ length: huecos }, (_, k) => `
            <button type="button" class="pi-tile pi-subir${items.length === 0 && k === 0 ? ' pi-tile--principal' : ''}" data-subir>
                <span class="pi-mas">${icono('plus', 16)}</span>
                <span>Subir</span>
            </button>`).join('');
        grid.innerHTML = tiles + subir;
        if (notificar) onCambio?.();
    }

    // ---------- Subir ----------
    grid.addEventListener('click', (e) => {
        const quitar = e.target.closest('[data-quitar]');
        if (quitar) {
            items.splice(Number(quitar.dataset.quitar), 1);
            pintar();
            return;
        }
        if (e.target.closest('[data-subir]')) input.click();
    });

    input.addEventListener('change', async () => {
        const archivos = [...input.files];
        input.value = '';
        for (const f of archivos) {
            if (!f.type.startsWith('image/')) {
                onAviso?.(`${f.name} no es una imagen.`);
                continue;
            }
            try {
                const blob = await aWebp(f, onAviso);
                items.push({ archivo: blob, nombre: nombreWebp(f.name), vista: URL.createObjectURL(blob) });
            } catch (err) {
                onAviso?.(`${f.name}: ${err.message}`);
            }
        }
        pintar();
    });

    // ---------- Reordenar arrastrando ----------
    const limpiarMarcas = () => grid.querySelectorAll('.is-arrastrando, .is-sobre')
        .forEach(x => x.classList.remove('is-arrastrando', 'is-sobre'));

    grid.addEventListener('dragstart', (e) => {
        const t = e.target.closest('.pi-tile[data-i]');
        if (!t) return;
        arrastrando = Number(t.dataset.i);
        t.classList.add('is-arrastrando');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(arrastrando));
    });

    grid.addEventListener('dragover', (e) => {
        const t = e.target.closest('.pi-tile[data-i]');
        if (arrastrando === null || !t) return;
        e.preventDefault();
        grid.querySelectorAll('.is-sobre').forEach(x => x.classList.remove('is-sobre'));
        t.classList.add('is-sobre');
    });

    grid.addEventListener('drop', (e) => {
        const t = e.target.closest('.pi-tile[data-i]');
        if (arrastrando === null || !t) return;
        e.preventDefault();
        const desde = arrastrando;
        const hacia = Number(t.dataset.i);
        arrastrando = null;
        if (desde !== hacia) {
            const [movida] = items.splice(desde, 1);
            items.splice(hacia, 0, movida);
        }
        pintar();
    });

    grid.addEventListener('dragend', () => {
        arrastrando = null;
        limpiarMarcas();
    });

    pintar(false);

    return {
        cantidad: () => items.length,
        vistaPrincipal: () => items[0]?.vista || '',
        /** Sube las pendientes (en orden) y devuelve las rutas para el JSON. */
        async obtenerRutas() {
            for (const it of items) {
                if (it.archivo) {
                    const r = await subirImagen(it.archivo, it.nombre);
                    it.ruta = r.ruta;
                    it.archivo = null;
                }
            }
            return items.map(it => it.ruta);
        }
    };
}

function nombreWebp(nombre) {
    return nombre.replace(/\.[^.]+$/, '') + '.webp';
}

async function aWebp(file, onAviso) {
    const bmp = await createImageBitmap(file);
    const { width: w, height: h } = bmp;
    if (Math.min(w, h) < MIN_LADO) {
        onAviso?.(`${file.name} mide ${w}×${h} px; se recomienda mínimo ${MIN_LADO} px.`);
    }
    if (file.type === 'image/webp' && Math.max(w, h) <= MAX_LADO) {
        bmp.close?.();
        return file;
    }
    const escala = Math.min(1, MAX_LADO / Math.max(w, h));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * escala);
    canvas.height = Math.round(h * escala);
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
    bmp.close?.();
    const blob = await new Promise(r => canvas.toBlob(r, 'image/webp', 0.9));
    if (!blob || blob.type !== 'image/webp') throw new Error('tu navegador no pudo convertirla a WebP.');
    return blob;
}

/* [FIN] IMÁGENES DEL PRODUCTO */