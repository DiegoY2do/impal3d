/* ==========================================================================
   Router del panel (por hash): #/productos, #/productos/nuevo, #/productos/12
   Cada ruta monta un componente en #panel-contenido sin recargar la página.
   ========================================================================== */

let resolverActual = null;

export function iniciarRouter(rutas, { alCambiar, alError } = {}) {
    let token = 0;

    async function resolver(scroll = true) {
        const ruta = location.hash.slice(1) || '/productos';
        const miToken = ++token;
        const vigente = () => miToken === token; // las vistas lo revisan después de cada await

        for (const r of rutas) {
            const m = ruta.match(r.patron);
            if (!m) continue;
            alCambiar?.(typeof r.clave === 'function' ? r.clave(m) : r.clave);
            if (scroll) window.scrollTo(0, 0);
            try {
                await r.vista(m, vigente);
            } catch (err) {
                console.error(err);
                if (vigente()) alError?.(err);
            }
            return;
        }
        location.replace('#/productos');
    }

    resolverActual = resolver;
    window.addEventListener('hashchange', () => resolver(true));
    return resolver(true);
}

/** Vuelve a pintar la pantalla actual (sin saltar al inicio). */
export const recargar = () => resolverActual?.(false);