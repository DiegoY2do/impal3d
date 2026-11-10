export function renderNovedadCard(imagen, categoria, titulo, descripcion, tiempo) {
    return `
        <article class="novedad-card">
            <img src="${imagen}" alt="${titulo}" loading="lazy">

            <div class="novedad-contenido">
                <span class="novedad-categoria">${categoria}</span>
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
                <small>${tiempo} min de lectura</small>
            </div>
        </article>
    `;
}