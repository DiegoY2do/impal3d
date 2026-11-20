/* ==========================================================================
   Acceso a datos del panel.
   Lee data/productos.json y guarda mediante el servidor local
   (node backend/dev-productos.cjs → http://localhost:4000/Panel.html).
   ========================================================================== */

const JSON_URL = 'data/productos.json';
const SIN_SERVIDOR = 'No hay conexión con el servidor local. Inícialo con "node backend/dev-productos.cjs" y abre http://localhost:4000/Panel.html';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function api(url, opciones) {
    let res;
    try {
        res = await fetch(url, opciones);
    } catch {
        throw new Error(SIN_SERVIDOR);
    }
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        // Sin JSON en la respuesta = no es nuestro servidor (Live Server, etc.)
        if (data === null) throw new Error(SIN_SERVIDOR);
        throw new Error(data.error || `Error ${res.status}`);
    }
    return data;
}

export async function leerProductos() {
    let res;
    try {
        res = await fetch(JSON_URL, { cache: 'no-store' });
    } catch {
        throw new Error('No pude leer data/productos.json.');
    }
    if (!res.ok) throw new Error('No pude leer data/productos.json.');
    return res.json();
}

export const crearProducto = (producto) =>
    api('/api/productos', { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(producto) });

export const actualizarProducto = (id, producto) =>
    api(`/api/productos/${id}`, { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(producto) });

export const eliminarProducto = (id) =>
    api(`/api/productos/${id}`, { method: 'DELETE' });

/** Sube un .webp a assets/img/productos/ y devuelve { ruta }. */
export const subirImagen = (blob, nombre) =>
    api(`/api/imagenes?nombre=${encodeURIComponent(nombre)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: blob
    });