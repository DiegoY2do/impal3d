
const formatoPrecio = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
});

const iconoCorazon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

const iconoBolsa = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;

const iconoEstrella = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

// Recibe UN producto y devuelve el HTML de su card.
export function renderCard(producto) {
    const imagenes = producto.imagenes ?? (producto.imagen ? [producto.imagen] : []);
    const [principal, hover] = imagenes;
    const nombre = producto.nombre.replaceAll('"', '&quot;');

    // Descuento: "desc" es el porcentaje (20 = 20% menos)
    // y "precio" es el precio normal, antes del descuento.
    const descuento = Number(producto.desc) > 0 ? Number(producto.desc) : 0;
    const precioFinal = descuento
        ? Math.round(producto.precio * (100 - descuento) / 100)
        : producto.precio;

    // Etiquetas sobre la imagen. Si está agotado solo se muestra "Agotado".
    const etiquetas = producto.agotado
        ? '<span class="card-etiqueta card-etiqueta-agotado">Agotado</span>'
        : [
            descuento ? `<span class="card-etiqueta card-etiqueta-descuento">-${descuento}%</span>` : '',
            producto.nuevo ? '<span class="card-etiqueta">Nuevo</span>' : '',
        ].join('');

    // Solo se pinta si el producto trae calificación
    const calificacion = producto.rating != null
        ? `<div class="card-rating">
               ${iconoEstrella}
               <span class="card-rating-valor">${producto.rating}</span>
               ${producto.resenas != null ? `<span class="card-rating-total">(${producto.resenas})</span>` : ''}
           </div>`
        : '';

    return `
        <article class="card">
            <div class="card-media">
                ${etiquetas ? `<div class="card-etiquetas">${etiquetas}</div>` : ''}
                <img class="card-imagen" src="${principal ?? ''}" alt="${nombre}">
                ${hover ? `<img class="card-imagen card-imagen-hover" src="${hover}" alt="" aria-hidden="true">` : ''}
                <button class="card-fav" type="button" data-id="${producto.id}" aria-label="Agregar ${nombre} a favoritos">
                    ${iconoCorazon}
                </button>
            </div>

            <div class="card-info">
                ${producto.categoria ? `<p class="card-categoria">${producto.categoria}</p>` : ''}
                <h3 class="card-nombre">
                    <a class="card-enlace" href="producto.html?id=${producto.id}">${producto.nombre}</a>
                </h3>
                ${calificacion}
                <div class="card-pie">
                    <div class="card-precios">
                        <p class="card-precio">${formatoPrecio.format(precioFinal)}</p>
                        ${descuento ? `<s class="card-precio-anterior">${formatoPrecio.format(producto.precio)}</s>` : ''}
                    </div>
                    <button class="card-carrito" type="button" data-id="${producto.id}" aria-label="Agregar ${nombre} al carrito" ${producto.agotado ? 'disabled' : ''}>
                        ${iconoBolsa}
                    </button>
                </div>
            </div>
        </article>
    `;
}