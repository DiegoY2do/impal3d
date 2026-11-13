
const categorias = [
    'Pedidos y pagos',
    'Envíos',
    'Devoluciones',
    'Piezas personalizadas',
    'Materiales e impresión 3D',
    'Mi cuenta'
];

const preguntas = [
    {
        categoria: 'Pedidos y pagos',
        pregunta: '¿Cómo puedo realizar un pedido?',
        respuesta: 'Puedes explorar nuestro catálogo, elegir la pieza que te interesa y comunicarte con nosotros para recibir orientación sobre tu compra.'
    },
    {
        categoria: 'Pedidos y pagos',
        pregunta: '¿Qué métodos de pago aceptan?',
        respuesta: 'Para conocer los métodos de pago disponibles, ponte en contacto con nuestro equipo antes de realizar tu pedido.'
    },
    {
        categoria: 'Pedidos y pagos',
        pregunta: '¿Puedo modificar mi pedido después de realizarlo?',
        respuesta: 'Si necesitas realizar algún cambio, comunícate con nosotros lo antes posible para revisar si todavía es posible modificarlo.'
    },
    {
        categoria: 'Envíos',
        pregunta: '¿Realizan envíos a todo México?',
        respuesta: 'Consulta con nuestro equipo la disponibilidad de envío para tu ubicación y las opciones correspondientes.'
    },
    {
        categoria: 'Envíos',
        pregunta: '¿Cuánto tarda en llegar mi pedido?',
        respuesta: 'El tiempo de entrega depende de la disponibilidad de la pieza, su proceso de fabricación y el destino del envío. Contáctanos para conocer el tiempo estimado.'
    },
    {
        categoria: 'Envíos',
        pregunta: '¿Cómo puedo conocer el estado de mi pedido?',
        respuesta: 'Puedes comunicarte con nosotros mediante WhatsApp para solicitar información sobre el estado de tu pedido.'
    },
    {
        categoria: 'Devoluciones',
        pregunta: '¿Puedo solicitar un cambio o devolución?',
        respuesta: 'Cada solicitud debe revisarse de acuerdo con las condiciones de compra y las características del producto. Contáctanos para recibir orientación.'
    },
    {
        categoria: 'Devoluciones',
        pregunta: '¿Qué hago si mi producto llega dañado?',
        respuesta: 'Comunícate con nuestro equipo y comparte fotografías del producto y del empaque para que podamos revisar tu caso.'
    },
    {
        categoria: 'Piezas personalizadas',
        pregunta: '¿Puedo solicitar una pieza personalizada?',
        respuesta: '¡Sí! Puedes contactarnos para compartir tu idea, diseño o referencia y revisar las posibilidades de fabricación.'
    },
    {
        categoria: 'Piezas personalizadas',
        pregunta: '¿Puedo solicitar un diseño desde cero?',
        respuesta: 'Puedes compartirnos tu propuesta para evaluar su viabilidad y las características necesarias para realizarla.'
    },
    {
        categoria: 'Materiales e impresión 3D',
        pregunta: '¿Qué materiales utilizan para imprimir?',
        respuesta: 'Los materiales dependen del tipo de pieza y sus características. Consulta con nuestro equipo cuál es el más adecuado para tu proyecto.'
    },
    {
        categoria: 'Materiales e impresión 3D',
        pregunta: '¿Las piezas impresas en 3D son resistentes?',
        respuesta: 'La resistencia depende del material, el diseño y los parámetros de impresión utilizados en cada pieza.'
    },
    {
    categoria: 'Mi cuenta',
    pregunta: '¿Cómo puedo crear una cuenta?',
    respuesta: 'Comunícate con nuestro equipo para recibir orientación sobre el acceso y registro en nuestra tienda.'
},
{
    categoria: 'Mi cuenta',
    pregunta: '¿Cómo puedo actualizar mis datos?',
    respuesta: 'Si necesitas actualizar tu información, ponte en contacto con nuestro equipo para recibir asistencia.'
},
{
    categoria: 'Mi cuenta',
    pregunta: '¿Qué hago si olvidé mis datos de acceso?',
    respuesta: 'Contacta con nuestro equipo para recibir ayuda y recuperar el acceso a tu cuenta.'
}
];

export function renderPreguntas() {
    return `
        <section class="faq-hero">
            <div class="faq-hero-contenido">
            <img
    src="./assets/img/Colecciones/decoracion.png"
    alt="Figura decorativa impresa en 3D"
    class="faq-hero-imagen faq-hero-imagen--izquierda"
    >

    <img
    src="./assets/img/Colecciones/venado.png"
    alt="Figura de venado impresa en 3D"
    class="faq-hero-imagen faq-hero-imagen--derecha"
    >
                <span class="faq-etiqueta">CENTRO DE AYUDA · IMP AL3D</span>

                <h1>¿En qué podemos ayudarte?</h1>

                <p>
                    Encuentra respuestas sobre nuestros productos,
                    pedidos y servicios de impresión 3D.
                </p>

                <div class="faq-buscador">
                    <i class="bi bi-search"></i>

                    <input
                        type="search"
                        id="faq-search"
                        placeholder="Busca una pregunta..."
                        aria-label="Buscar preguntas frecuentes"
                    >

                    <button id="faq-clear" type="button"
                        aria-label="Limpiar búsqueda">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
        </section>

        <section class="faq-contenedor container-max">

            
            <div class="faq-layout">

                <aside class="faq-categorias">
                    <h3>Categorías</h3>

                    <div class="faq-lista-categorias">
                        ${categorias.map((categoria, index) => `
                            <button
                                class="faq-categoria ${index === 0 ? 'active' : ''}"
                                data-categoria="${categoria}"
                                type="button">
                                ${categoria}
                                <i class="bi bi-chevron-right"></i>
                            </button>
                        `).join('')}
                    </div>
                </aside>

                <div class="faq-resultados">
                    <div class="faq-resultados-info">
                        <h3 id="faq-titulo">Todas las preguntas</h3>
                        <span id="faq-contador"></span>
                    </div>

                    <div id="faq-acordeon" class="faq-acordeon"></div>

                    <p id="faq-vacio" class="faq-vacio" hidden>
                        No encontramos preguntas relacionadas.
                        Intenta con otra búsqueda.
                    </p>
                </div>

            </div>
        </section>

        <section class="faq-contacto container-max">
            <div class="faq-contacto-contenido">
                <span class="faq-etiqueta">ESTAMOS PARA AYUDARTE</span>

                <h2>¿No encontraste lo que buscabas?</h2>

                <p>
                    Nuestro equipo puede ayudarte con tus dudas
                    y orientarte sobre tu próximo proyecto.
                </p>

                <div class="faq-contacto-botones">
                    <a href="./contacto.html" class="faq-btn-principal">
                        Ir a contacto
                    </a>

                    <a
                        href="https://api.whatsapp.com/send/?phone=525641964434"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="faq-btn-secundario">
                        <i class="bi bi-whatsapp"></i>
                        Contactar por WhatsApp
                    </a>
                </div>
            </div>
        </section>
    `;
}

export function initPreguntas() {
    const buscador = document.querySelector('#faq-search');
    const limpiar = document.querySelector('#faq-clear');
    const acordeon = document.querySelector('#faq-acordeon');
    const titulo = document.querySelector('#faq-titulo');
    const contador = document.querySelector('#faq-contador');
    const vacio = document.querySelector('#faq-vacio');
    const botones = document.querySelectorAll('.faq-categoria');

    if (!buscador || !acordeon) return;

    let categoriaActual = 'Todas las preguntas';
    let busquedaActual = '';

    function actualizarPreguntas() {
        const resultados = preguntas.filter(item => {
            const coincideCategoria =
                categoriaActual === 'Todas las preguntas' ||
                item.categoria === categoriaActual;

            const texto = `${item.pregunta} ${item.respuesta} ${item.categoria}`
                .toLowerCase();

            const coincideBusqueda = texto.includes(busquedaActual);

            return coincideCategoria && coincideBusqueda;
        });

        titulo.textContent = categoriaActual;
        contador.textContent = `${resultados.length} preguntas`;

        vacio.hidden = resultados.length > 0;

        acordeon.innerHTML = resultados.map((item, index) => `
            <article class="faq-item">
                <button
                    class="faq-pregunta"
                    type="button"
                    aria-expanded="false">
                    <span>${item.pregunta}</span>
                    <i class="bi bi-plus-lg"></i>
                </button>

                <div class="faq-respuesta" hidden>
                    <p>${item.respuesta}</p>
                </div>
            </article>
        `).join('');

        acordeon.querySelectorAll('.faq-pregunta').forEach(boton => {
            boton.addEventListener('click', () => {
                const respuesta = boton.nextElementSibling;
                const estaAbierta = boton.getAttribute('aria-expanded') === 'true';

                acordeon.querySelectorAll('.faq-pregunta').forEach(otro => {
                    otro.setAttribute('aria-expanded', 'false');
                    otro.nextElementSibling.hidden = true;
                    otro.querySelector('i').className = 'bi bi-plus-lg';
                });

                if (!estaAbierta) {
                    boton.setAttribute('aria-expanded', 'true');
                    respuesta.hidden = false;
                    boton.querySelector('i').className = 'bi bi-dash-lg';
                }
            });
        });
    }

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            botones.forEach(item => item.classList.remove('active'));

            boton.classList.add('active');

            categoriaActual = boton.dataset.categoria;

            actualizarPreguntas();
        });
    });

    buscador.addEventListener('input', () => {
        busquedaActual = buscador.value.trim().toLowerCase();
        actualizarPreguntas();
    });

    limpiar.addEventListener('click', () => {
        buscador.value = '';
        busquedaActual = '';
        buscador.focus();
        actualizarPreguntas();
    });

    actualizarPreguntas();
}
