import { renderCard } from './cards.js';

const favoritos = [
    { id: 1, nombre: 'Coraline', categoria: 'Terror', precio: 50, desc: 20, rating: 4.9, resenas: 305, imagen: 'assets/img/productos/coraline.webp' },
    { id: 2, nombre: 'Sam', categoria: 'Terror', precio: 40, rating: 4.7, resenas: 174, imagen: 'assets/img/productos/sam.webp' },
    { id: 3, nombre: 'Tiffany', categoria: 'Terror', precio: 50, rating: 5.0, resenas: 61, imagen: 'assets/img/productos/tiffany.webp' }
];

const pedidos = [
    { id: '#IMP-1042', fecha: '12 oct 2026', estado: 'En producción', clase: 'produccion', total: '$1,184.40' },
    { id: '#IMP-0987', fecha: '28 sep 2026', estado: 'En camino', clase: 'camino', total: '$549.00' },
    { id: '#IMP-0921', fecha: '03 sep 2026', estado: 'Entregado', clase: 'entregado', total: '$389.00' },
    { id: '#IMP-0866', fecha: '14 ago 2026', estado: 'Cancelado', clase: 'cancelado', total: '$259.00' }
];

function renderPedidos() {
    return pedidos.map((p) => `
        <tr>
            <td class="cuenta-pedido-id">${p.id}</td>
            <td>${p.fecha}</td>
            <td><span class="cuenta-estado cuenta-estado-${p.clase}">${p.estado}</span></td>
            <td class="cuenta-pedido-total">${p.total}</td>
            <td class="cuenta-tabla-accion"><a href="#">Ver detalle</a></td>
        </tr>
    `).join('');
}

export function renderCuenta() {
    return `
        <section class="cuenta">
            <div class="container-max">
                <nav class="cuenta-migas" aria-label="Ruta de navegación">
                    <a href="index.html">Inicio</a>
                    <span>/</span>
                    <span class="cuenta-migas-actual">Mi cuenta</span>
                </nav>

                <div class="cuenta-layout">
                    <aside class="cuenta-menu">
                        <div class="cuenta-perfil">
                            <div class="cuenta-avatar" aria-hidden="true">NA</div>
                            <div>
                                <strong>[Nombre Apellido]</strong>
                                <p>tu@correo.com</p>
                            </div>
                        </div>
                        <nav class="cuenta-enlaces" aria-label="Menú de cuenta">
                            <a class="activo" href="#resumen">Resumen</a>
                            <a href="#pedidos">Mis pedidos</a>
                            <a href="#direcciones">Direcciones</a>
                            <a href="#datos">Datos personales</a>
                            <a href="#favoritos">Favoritos</a>
                            <a href="#">Cerrar sesión</a>
                        </nav>
                    </aside>

                    <div class="cuenta-contenido">
                        <div id="resumen" class="cuenta-saludo">
                            <h1>Hola, [Nombre]</h1>
                            <p>Aquí puedes revisar tus pedidos, direcciones y favoritos.</p>
                        </div>

                        <div class="cuenta-stats">
                            <div class="cuenta-stat"><p>Pedidos en curso</p><strong>1</strong></div>
                            <div class="cuenta-stat"><p>Pedidos completados</p><strong>8</strong></div>
                            <div class="cuenta-stat"><p>Productos favoritos</p><strong>12</strong></div>
                        </div>

                        <section id="pedidos" class="cuenta-bloque">
                            <div class="cuenta-bloque-cabecera">
                                <h2>Pedidos recientes</h2>
                                <a href="#">Ver todos</a>
                            </div>
                            <div class="cuenta-tabla-caja">
                                <table class="cuenta-tabla">
                                    <thead>
                                        <tr>
                                            <th>Pedido</th><th>Fecha</th><th>Estado</th><th>Total</th>
                                            <th class="cuenta-tabla-accion">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>${renderPedidos()}</tbody>
                                </table>
                            </div>
                        </section>

                        <section id="direcciones" class="cuenta-bloque">
                            <div class="cuenta-bloque-cabecera">
                                <h2>Mis direcciones</h2>
                            </div>
                            <div class="cuenta-direcciones">
                                <article class="cuenta-direccion cuenta-direccion-principal">
                                    <div class="cuenta-direccion-titulo">
                                        <strong>Casa</strong>
                                        <span class="cuenta-etiqueta">Principal</span>
                                    </div>
                                    <p>[Calle y número]<br>[Colonia, CP, Ciudad]<br>[Estado]</p>
                                    <div class="cuenta-direccion-acciones">
                                        <a href="#">Editar</a>
                                        <a class="eliminar" href="#">Eliminar</a>
                                    </div>
                                </article>

                                <article class="cuenta-direccion">
                                    <div class="cuenta-direccion-titulo">
                                        <strong>Oficina</strong>
                                    </div>
                                    <p>[Calle y número]<br>[Colonia, CP, Ciudad]<br>[Estado]</p>
                                    <div class="cuenta-direccion-acciones">
                                        <a href="#">Editar</a>
                                        <a class="eliminar" href="#">Eliminar</a>
                                    </div>
                                </article>

                                <a class="cuenta-direccion-nueva" href="#">
                                    <span class="cuenta-mas" aria-hidden="true">+</span>
                                    <strong>Agregar dirección</strong>
                                </a>
                            </div>
                        </section>

                        <section id="favoritos" class="cuenta-bloque">
                            <div class="cuenta-bloque-cabecera">
                                <h2>Mis favoritos</h2>
                                <a href="#">Ver todos</a>
                            </div>
                            <div class="cuenta-favoritos">
                                ${favoritos.map(renderCard).join('')}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    `;
}