import { renderCard } from './cards.js';

const usuario = {
    nombre: 'Nombre',
    apellido: 'Apellido',
    correo: 'tu@correo.com',
    telefono: ''
};

const pedidos = [
    {
        id: 'IMP-1042', fecha: '12 oct 2026', estado: 'En producción', clase: 'produccion',
        articulos: [
            { nombre: 'Dragón articulado Noche', cantidad: 1, precio: 389 },
            { nombre: 'Zorro articulado para auto', cantidad: 1, precio: 259 },
            { nombre: 'Posavasos Eeveelutions (set de 8)', cantidad: 1, precio: 389 },
            { nombre: 'Shih tzu familia (set de 3)', cantidad: 1, precio: 279 }
        ],
        descuento: 131.6, envio: 0
    },
    {
        id: 'IMP-0987', fecha: '28 sep 2026', estado: 'En camino', clase: 'camino',
        articulos: [{ nombre: 'Calavera Voronoi dorada', cantidad: 1, precio: 449 }],
        descuento: 0, envio: 100
    },
    {
        id: 'IMP-0921', fecha: '03 sep 2026', estado: 'Entregado', clase: 'entregado',
        articulos: [{ nombre: 'Dragón articulado Noche', cantidad: 1, precio: 389 }],
        descuento: 0, envio: 0
    },
    {
        id: 'IMP-0866', fecha: '14 ago 2026', estado: 'Cancelado', clase: 'cancelado',
        articulos: [{ nombre: 'Zorro articulado para auto', cantidad: 1, precio: 259 }],
        descuento: 0, envio: 0
    }
];

const direcciones = [
    { id: 1, nombre: 'Casa', calle: '[Calle y número]', colonia: '[Colonia]', cp: '00000', ciudad: '[Ciudad]', estado: '[Estado]', principal: true },
    { id: 2, nombre: 'Oficina', calle: '[Calle y número]', colonia: '[Colonia]', cp: '00000', ciudad: '[Ciudad]', estado: '[Estado]', principal: false }
];

const favoritos = [
    { id: 1, nombre: 'Coraline', categoria: 'Terror', precio: 50, desc: 20, rating: 4.9, resenas: 305, imagen: 'assets/img/productos/coraline.webp' },
    { id: 2, nombre: 'Sam', categoria: 'Terror', precio: 40, rating: 4.7, resenas: 174, imagen: 'assets/img/productos/sam.webp' },
    { id: 3, nombre: 'Tiffany', categoria: 'Terror', precio: 50, rating: 5, resenas: 61, imagen: 'assets/img/productos/tiffany.webp' },
    { id: 4, nombre: 'Ghostface', categoria: 'Terror', precio: 45, rating: 4.8, resenas: 212, imagen: 'assets/img/productos/Ghostface.webp' },
    { id: 5, nombre: 'Pennywise', categoria: 'Terror', precio: 45, rating: 4.6, resenas: 98, imagen: 'assets/img/productos/Pennywise.webp' },
    { id: 6, nombre: 'Michael Myers', categoria: 'Terror', precio: 50, rating: 4.9, resenas: 143, imagen: 'assets/img/productos/Michael-Myers.webp' }
];

let aviso = '';


const moneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

const esc = (texto) =>
    String(texto ?? '').replace(/[&<>"']/g, (c) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const subtotal = (p) => p.articulos.reduce((t, a) => t + a.precio * a.cantidad, 0);
const totalPedido = (p) => subtotal(p) - p.descuento + p.envio;
const iniciales = () =>
    ((usuario.nombre[0] || '') + (usuario.apellido[0] || '')).toUpperCase() || 'U';

const OPCIONES_MENU = [
    ['resumen', 'Resumen'],
    ['pedidos', 'Mis pedidos'],
    ['direcciones', 'Direcciones'],
    ['datos', 'Datos personales'],
    ['favoritos', 'Favoritos']
];


function listaPedidos(lista) {
    if (!lista.length) {
        return '<p class="cuenta-vacio">Todavía no tienes pedidos. <a href="index.html">Ver productos</a></p>';
    }

    
    const filas = lista.map((p) => `
        <tr>
            <td class="cuenta-pedido-id">#${p.id}</td>
            <td>${p.fecha}</td>
            <td><span class="cuenta-estado cuenta-estado-${p.clase}">${p.estado}</span></td>
            <td class="cuenta-pedido-total">${moneda.format(totalPedido(p))}</td>
            <td class="cuenta-tabla-accion"><a href="#pedido/${p.id}">Ver detalle</a></td>
        </tr>
    `).join('');

    const acordeon = lista.map((p) => `
        <details class="cuenta-pedido-item">
            <summary>
                <span class="cuenta-pedido-id">#${p.id}</span>
                <span class="cuenta-estado cuenta-estado-${p.clase}">${p.estado}</span>
            </summary>
            <dl class="cuenta-pedido-datos">
                <div><dt>Fecha</dt><dd>${p.fecha}</dd></div>
                <div><dt>Total</dt><dd>${moneda.format(totalPedido(p))}</dd></div>
            </dl>
            <a class="cuenta-boton-secundario" href="#pedido/${p.id}">Ver detalle</a>
        </details>
    `).join('');

    return `
        <div class="cuenta-tabla-caja">
            <table class="cuenta-tabla">
                <thead>
                    <tr>
                        <th>Pedido</th><th>Fecha</th><th>Estado</th><th>Total</th>
                        <th class="cuenta-tabla-accion">Acción</th>
                    </tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
        </div>
        <div class="cuenta-pedidos-acordeon">${acordeon}</div>
    `;
}

function tarjetaDireccion(d) {
    return `
        <article class="cuenta-direccion${d.principal ? ' cuenta-direccion-principal' : ''}">
            <div class="cuenta-direccion-titulo">
                <strong>${esc(d.nombre)}</strong>
                ${d.principal ? '<span class="cuenta-etiqueta">Principal</span>' : ''}
            </div>
            <p>${esc(d.calle)}<br>${esc(d.colonia)}, ${esc(d.cp)}, ${esc(d.ciudad)}<br>${esc(d.estado)}</p>
            <div class="cuenta-direccion-acciones">
                <a href="#direccion/editar/${d.id}">Editar</a>
                <button type="button" class="eliminar" data-accion="eliminar-direccion" data-id="${d.id}">Eliminar</button>
            </div>
        </article>
    `;
}

function gridDirecciones() {
    return `
        <div class="cuenta-direcciones">
            ${direcciones.map(tarjetaDireccion).join('')}
            <a class="cuenta-direccion-nueva" href="#direccion/nueva">
                <span class="cuenta-mas" aria-hidden="true">+</span>
                <strong>Agregar dirección</strong>
            </a>
        </div>
    `;
}

function gridFavoritos(lista, esResumen = false) {
    if (!lista.length) {
        return '<p class="cuenta-vacio">Todavía no tienes productos favoritos. <a href="index.html">Ver productos</a></p>';
    }
    return `<div class="cuenta-favoritos${esResumen ? ' cuenta-favoritos--resumen' : ''}">${lista.map(renderCard).join('')}</div>`;
}

function cabecera(titulo, texto) {
    return `
        <div class="cuenta-saludo">
            <h1>${titulo}</h1>
            <p>${texto}</p>
        </div>
    `;
}

function noEncontrado(texto, volverA, volverTexto) {
    return `
        <div class="cuenta-saludo">
            <h1>No encontramos ${texto}</h1>
            <p>Puede que ya no exista o que el enlace esté incompleto.</p>
        </div>
        <a class="cuenta-volver" href="${volverA}">${volverTexto}</a>
    `;
}


function vistaResumen() {
    const enCurso = pedidos.filter((p) => p.estado === 'En producción' || p.estado === 'En camino').length;
    const completados = pedidos.filter((p) => p.estado === 'Entregado').length;

    return {
        clave: 'resumen',
        etiqueta: '',
        html: `
            ${cabecera(`Hola, ${esc(usuario.nombre)}`, 'Aquí puedes revisar tus pedidos, direcciones y favoritos.')}

            <div class="cuenta-stats">
                <div class="cuenta-stat"><p>Pedidos en curso</p><strong>${enCurso}</strong></div>
                <div class="cuenta-stat"><p>Pedidos completados</p><strong>${completados}</strong></div>
                <div class="cuenta-stat"><p>Productos favoritos</p><strong>${favoritos.length}</strong></div>
            </div>

            <section class="cuenta-bloque">
                <div class="cuenta-bloque-cabecera">
                    <h2>Pedidos recientes</h2>
                    <a href="#pedidos">Ver todos</a>
                </div>
                ${listaPedidos(pedidos.slice(0, 4))}
            </section>

            <section class="cuenta-bloque">
                <div class="cuenta-bloque-cabecera">
                    <h2>Mis direcciones</h2>
                    <a href="#direcciones">Administrar</a>
                </div>
                ${gridDirecciones()}
            </section>

            <section class="cuenta-bloque">
                <div class="cuenta-bloque-cabecera">
                    <h2>Mis favoritos</h2>
                    <a href="#favoritos">Ver todos</a>
                </div>
                ${gridFavoritos(favoritos.slice(0, 3), true)}
            </section>
        `
    };
}

function vistaPedidos() {
    return {
        clave: 'pedidos',
        etiqueta: 'Mis pedidos',
        html: `
            ${cabecera('Mis pedidos', 'Revisa el estado de cada pedido y abre su detalle.')}
            <section class="cuenta-bloque">${listaPedidos(pedidos)}</section>
        `
    };
}

const PASOS = ['Recibido', 'En producción', 'En camino', 'Entregado'];
const POSICION = { 'En producción': 1, 'En camino': 2, 'Entregado': 3 };

function seguimiento(p) {
    if (p.estado === 'Cancelado') {
        return '<p class="cuenta-aviso-cancelado">Este pedido fue cancelado.</p>';
    }
    const actual = POSICION[p.estado];
    return `
        <ol class="cuenta-pasos">
            ${PASOS.map((nombre, i) => `
                <li class="${i < actual ? 'hecho' : ''}${i === actual ? ' actual' : ''}">
                    <i class="cuenta-paso-punto" aria-hidden="true"></i>${nombre}
                </li>
            `).join('')}
        </ol>
    `;
}

function vistaPedido(id) {
    const p = pedidos.find((x) => x.id === id);
    if (!p) {
        return {
            clave: 'pedidos',
            etiqueta: 'Pedido no encontrado',
            html: noEncontrado('ese pedido', '#pedidos', 'Volver a mis pedidos')
        };
    }
    const entrega = direcciones.find((d) => d.principal) || direcciones[0];

    return {
        clave: 'pedidos',
        etiqueta: `Pedido #${p.id}`,
        html: `
            <a class="cuenta-volver" href="#pedidos">Volver a mis pedidos</a>

            <div class="cuenta-saludo">
                <h1>Pedido #${p.id}</h1>
                <div class="cuenta-detalle-meta">
                    <span class="cuenta-estado cuenta-estado-${p.clase}">${p.estado}</span>
                    <span class="cuenta-detalle-fecha">Realizado el ${p.fecha}</span>
                </div>
            </div>

            <section class="cuenta-card cuenta-card-seguimiento">
                <h2>Seguimiento</h2>
                ${seguimiento(p)}
            </section>

            <div class="cuenta-detalle">
                <section class="cuenta-card">
                    <h2>Productos</h2>
                    <ul class="cuenta-lineas">
                        ${p.articulos.map((a) => `
                            <li>
                                <div class="cuenta-linea-nombre">
                                    ${esc(a.nombre)}
                                    <small>Cantidad: ${a.cantidad}</small>
                                </div>
                                <strong>${moneda.format(a.precio * a.cantidad)}</strong>
                            </li>
                        `).join('')}
                    </ul>
                </section>

                <div class="cuenta-detalle-lado">
                    <section class="cuenta-card">
                        <h2>Resumen</h2>
                        <dl class="cuenta-resumen">
                            <div><dt>Subtotal</dt><dd>${moneda.format(subtotal(p))}</dd></div>
                            ${p.descuento ? `<div><dt>Descuento (BIENVENIDO10)</dt><dd>-${moneda.format(p.descuento)}</dd></div>` : ''}
                            <div><dt>Envío</dt><dd>${p.envio ? moneda.format(p.envio) : 'Gratis'}</dd></div>
                            <div class="cuenta-resumen-total"><dt>Total</dt><dd>${moneda.format(totalPedido(p))}</dd></div>
                        </dl>
                    </section>

                    <section class="cuenta-card">
                        <h2>Dirección de entrega</h2>
                        ${entrega
                            ? `<p>${esc(entrega.nombre)}<br>${esc(entrega.calle)}<br>${esc(entrega.colonia)}, ${esc(entrega.cp)}, ${esc(entrega.ciudad)}<br>${esc(entrega.estado)}</p>`
                            : '<p>Aún no tienes una dirección registrada.</p>'}
                    </section>
                </div>
            </div>
        `
    };
}

function vistaDirecciones() {
    return {
        clave: 'direcciones',
        etiqueta: 'Direcciones',
        html: `
            ${cabecera('Direcciones', 'Elige dónde quieres recibir tus pedidos.')}
            <section class="cuenta-bloque">${gridDirecciones()}</section>
        `
    };
}

function vistaFormDireccion(modo, id) {
    const editando = modo === 'editar';
    const d = editando ? direcciones.find((x) => x.id === Number(id)) : {};

    if (editando && !d) {
        return {
            clave: 'direcciones',
            etiqueta: 'Dirección no encontrada',
            html: noEncontrado('esa dirección', '#direcciones', 'Volver a direcciones')
        };
    }

    const titulo = editando ? 'Editar dirección' : 'Agregar dirección';
    const marcarPrincipal = editando ? d.principal : direcciones.length === 0;

    return {
        clave: 'direcciones',
        etiqueta: titulo,
        html: `
            <a class="cuenta-volver" href="#direcciones">Volver a direcciones</a>
            ${cabecera(titulo, 'Escribe la dirección completa para que tu pedido llegue sin problemas.')}

            <form class="cuenta-form" data-form="direccion" data-id="${editando ? d.id : ''}">
                <label>Nombre de la dirección
                    <input name="nombre" required maxlength="30" placeholder="Casa, oficina..." value="${esc(d.nombre)}">
                </label>
                <label>Calle y número
                    <input name="calle" required value="${esc(d.calle)}">
                </label>
                <div class="cuenta-form-fila">
                    <label>Colonia
                        <input name="colonia" required value="${esc(d.colonia)}">
                    </label>
                    <label>Código postal
                        <input name="cp" required inputmode="numeric" pattern="[0-9]{5}" title="Escribe 5 números" value="${esc(d.cp)}">
                    </label>
                </div>
                <div class="cuenta-form-fila">
                    <label>Ciudad
                        <input name="ciudad" required value="${esc(d.ciudad)}">
                    </label>
                    <label>Estado
                        <input name="estado" required value="${esc(d.estado)}">
                    </label>
                </div>
                <label class="cuenta-check">
                    <input type="checkbox" name="principal"${marcarPrincipal ? ' checked' : ''}>
                    Usar como dirección principal
                </label>
                <div class="cuenta-form-acciones">
                    <button type="submit" class="btn-primary">Guardar dirección</button>
                    <a class="btn-secundary" href="#direcciones">Cancelar</a>
                </div>
            </form>
        `
    };
}

function vistaDatos() {
    return {
        clave: 'datos',
        etiqueta: 'Datos personales',
        html: `
            ${cabecera('Datos personales', 'Mantén tu información al día para recibir tus pedidos y avisos.')}

            <form class="cuenta-form" data-form="datos">
                ${aviso ? `<p class="cuenta-mensaje" role="status">${esc(aviso)}</p>` : ''}
                <div class="cuenta-form-fila">
                    <label>Nombre
                        <input name="nombre" required value="${esc(usuario.nombre)}">
                    </label>
                    <label>Apellido
                        <input name="apellido" required value="${esc(usuario.apellido)}">
                    </label>
                </div>
                <label>Correo electrónico
                    <input type="email" name="correo" required value="${esc(usuario.correo)}">
                </label>
                <label>Teléfono
                    <input type="tel" name="telefono" inputmode="tel" placeholder="10 dígitos" value="${esc(usuario.telefono)}">
                </label>
                <div class="cuenta-form-acciones">
                    <button type="submit" class="btn-primary">Guardar cambios</button>
                </div>
            </form>
        `
    };
}

function vistaFavoritos() {
    return {
        clave: 'favoritos',
        etiqueta: 'Favoritos',
        html: `
            ${cabecera('Favoritos', 'Los productos que guardaste. Toca el corazón para quitarlos de la lista.')}
            <section class="cuenta-bloque">${gridFavoritos(favoritos)}</section>
        `
    };
}

function elegirVista() {
    const [seccion, a, b] = location.hash.replace(/^#/, '').split('/');

    switch (seccion) {
        case 'pedidos': return vistaPedidos();
        case 'pedido': return vistaPedido(a);
        case 'direcciones': return vistaDirecciones();
        case 'direccion': return vistaFormDireccion(a, b);
        case 'datos': return vistaDatos();
        case 'favoritos': return vistaFavoritos();
        default: return vistaResumen();
    }
}

export function renderCuenta() {
    const vista = elegirVista();
    const nombreMenu = OPCIONES_MENU.find(([clave]) => clave === vista.clave)[1];

    const enlaces = OPCIONES_MENU.map(([clave, texto]) =>
        `<a href="#${clave}"${clave === vista.clave ? ' class="activo" aria-current="page"' : ''}>${texto}</a>`
    ).join('');

    return `
        <section class="cuenta">
            <div class="container-max">
                <nav class="cuenta-migas" aria-label="Ruta de navegación">
                    <a href="index.html">Inicio</a>
                    <span>/</span>
                    ${vista.etiqueta
                        ? `<a href="#resumen">Mi cuenta</a><span>/</span><span class="cuenta-migas-actual">${vista.etiqueta}</span>`
                        : '<span class="cuenta-migas-actual">Mi cuenta</span>'}
                </nav>

                <div class="cuenta-layout">
                    <aside class="cuenta-menu">
                        <div class="cuenta-perfil">
                            <div class="cuenta-avatar" aria-hidden="true">${esc(iniciales())}</div>
                            <div>
                                <strong>${esc(usuario.nombre)} ${esc(usuario.apellido)}</strong>
                                <p>${esc(usuario.correo)}</p>
                            </div>
                        </div>

                        <button type="button" class="cuenta-menu-toggle" data-accion="menu-toggle"
                                aria-expanded="false" aria-controls="cuenta-menu-lista">
                            <span>Menú: ${nombreMenu}</span>
                            <i class="cuenta-menu-flecha" aria-hidden="true"></i>
                        </button>

                        <nav id="cuenta-menu-lista" class="cuenta-enlaces" aria-label="Menú de cuenta">
                            ${enlaces}
                            <a href="cuenta.html">Cerrar sesión</a>
                        </nav>
                    </aside>

                    <div class="cuenta-contenido">${vista.html}</div>
                </div>
            </div>
        </section>
    `;
}

function guardarDireccion(datos, id) {
    const nueva = {
        nombre: datos.nombre.trim(),
        calle: datos.calle.trim(),
        colonia: datos.colonia.trim(),
        cp: datos.cp.trim(),
        ciudad: datos.ciudad.trim(),
        estado: datos.estado.trim(),
        principal: datos.principal === 'on'
    };

    if (id) {
        Object.assign(direcciones.find((d) => d.id === Number(id)), nueva);
    } else {
        direcciones.push({ id: Math.max(0, ...direcciones.map((d) => d.id)) + 1, ...nueva });
    }

    if (nueva.principal) {
        const guardada = id ? Number(id) : direcciones[direcciones.length - 1].id;
        direcciones.forEach((d) => { d.principal = d.id === guardada; });
    }
    if (direcciones.length && !direcciones.some((d) => d.principal)) {
        direcciones[0].principal = true;
    }
}

export function initCuenta() {
    const contenedor = document.querySelector('#cuenta');
    if (!contenedor) return;

    const pintar = (subir = true) => {
        contenedor.innerHTML = renderCuenta();
        aviso = '';
        if (subir) window.scrollTo({ top: 0 });
    };

    window.addEventListener('hashchange', () => pintar(true));

    contenedor.addEventListener('click', (e) => {
        const corazon = e.target.closest('.card-fav');
        if (corazon) {
            const i = favoritos.findIndex((f) => f.id === Number(corazon.dataset.id));
            if (i > -1) {
                favoritos.splice(i, 1);
                pintar(false);
            }
            return;
        }

        const boton = e.target.closest('[data-accion]');
        if (!boton) return;

        if (boton.dataset.accion === 'menu-toggle') {
            const abierto = boton.closest('.cuenta-menu').classList.toggle('abierto');
            boton.setAttribute('aria-expanded', String(abierto));
        }

        if (boton.dataset.accion === 'eliminar-direccion') {
            if (!window.confirm('¿Eliminar esta dirección?')) return;
            const i = direcciones.findIndex((d) => d.id === Number(boton.dataset.id));
            if (i > -1) {
                direcciones.splice(i, 1);
                if (direcciones.length && !direcciones.some((d) => d.principal)) {
                    direcciones[0].principal = true;
                }
                pintar(false);
            }
        }
    });

    contenedor.addEventListener('submit', (e) => {
        const form = e.target.closest('form[data-form]');
        if (!form) return;
        e.preventDefault();

        const datos = Object.fromEntries(new FormData(form));

        if (form.dataset.form === 'direccion') {
            guardarDireccion(datos, form.dataset.id);
            location.hash = '#direcciones'; // dispara hashchange y repinta
        }

        if (form.dataset.form === 'datos') {
            usuario.nombre = datos.nombre.trim();
            usuario.apellido = datos.apellido.trim();
            usuario.correo = datos.correo.trim();
            usuario.telefono = (datos.telefono || '').trim();
            aviso = 'Tus datos se guardaron correctamente.';
            pintar(false);
        }
    });
}