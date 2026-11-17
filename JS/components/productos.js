export const RUTA_PRODUCTOS = 'data/productos.json';

export async function cargarProductos(url = RUTA_PRODUCTOS) {
    const respuesta = await fetch(url);

    if (!respuesta.ok) throw new Error(`No se pudo cargar ${url}`);

    return respuesta.json();
}