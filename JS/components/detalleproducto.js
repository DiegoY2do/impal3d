import { cargarProductos } from './productos.js';

async function mostrarProducto() {
    

    try {
        const productos = await cargarProductos();

        const producto = productos[0];

        document.getElementById("producto-nombre").textContent =
            producto.nombre;

        document.getElementById("producto-precio").textContent =
            "$" + producto.precio;

        document.getElementById("producto-descripcion").textContent =
            producto.descripcion;

        // Galería de imágenes
        const imagenPrincipal = document.getElementById("producto-imagen");
        const contenedorMiniaturas = document.getElementById("producto-miniaturas");

        contenedorMiniaturas.innerHTML = "";

        // Mostrar la primera imagen
            if (producto.imagenes && producto.imagenes.length > 0) {

            imagenPrincipal.src = producto.imagenes[0];
            imagenPrincipal.alt = producto.nombre;

        // 4 miniaturas usando la misma imagen (Provisional)
        const imagenesGaleria = producto.imagenes.length === 1
        ? Array(4).fill(producto.imagenes[0])
        : producto.imagenes;

        imagenesGaleria.forEach((imagen, index) => {

        const miniatura = document.createElement("img");

        miniatura.src = imagen;
        miniatura.alt = `${producto.nombre} - imagen ${index + 1}`;
        miniatura.classList.add("miniatura");

        if (index === 0) {
            miniatura.classList.add("activa");
        }

        miniatura.addEventListener("click", () => {

            imagenPrincipal.src = imagen;
            document.querySelectorAll(".miniatura").forEach(img => {
                img.classList.remove("activa");
            });

            miniatura.classList.add("activa");

        });

        contenedorMiniaturas.appendChild(miniatura);

    });

}

        document.getElementById("producto-categoria").textContent =
            producto.categoria;

        document.getElementById("producto-calificacion").textContent =
            producto.rating;

        document.getElementById("producto-resenas").textContent =
            `(${producto.resenas} reseñas)`;

    } catch (error) {
        console.error("Error al cargar el producto:", error);
    }
}

mostrarProducto();

// Colores
const botonesColores = document.querySelectorAll(".color-opcion");

botonesColores.forEach(boton => {

    boton.addEventListener("click", () => {

        botonesColores.forEach(color => {
            color.classList.remove("activo");
        });

        boton.classList.add("activo");

        document.getElementById("color-seleccionado").textContent =
            boton.dataset.color;

    });

});

// Tamaños
const botonesTamanos = document.querySelectorAll(".tamano-opcion");

botonesTamanos.forEach(boton => {

    boton.addEventListener("click", () => {

        botonesTamanos.forEach(tamano => {
            tamano.classList.remove("activo");
        });

        boton.classList.add("activo");

    });

});


let cantidad = 1;

const cantidadValor = document.getElementById("cantidad-valor");
const botonMenos = document.getElementById("cantidad-menos");
const botonMas = document.getElementById("cantidad-mas");

// Aumentar cantidad
botonMas.addEventListener("click", () => {
    cantidad++;
    cantidadValor.textContent = cantidad;
});

// Disminuir cantidad
botonMenos.addEventListener("click", () => {
    if (cantidad > 1) {
        cantidad--;
        cantidadValor.textContent = cantidad;
    }
});

// Favoritos

const botonFavorito = document.getElementById("producto-favorito");

botonFavorito.addEventListener("click", () => {

    botonFavorito.classList.toggle("activo");

    const esFavorito = botonFavorito.classList.contains("activo");

    botonFavorito.style.color = esFavorito ? "#E63946" : "#17171F";
    botonFavorito.setAttribute("aria-pressed", String(esFavorito));
    botonFavorito.setAttribute(
        "aria-label",
        esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"
    );

});

//Envio 
const botonCalcular = document.getElementById("calcular-envio");
const codigoPostal = document.getElementById("codigo-postal");
const resultadoEnvio = document.getElementById("envio-resultado");

botonCalcular.addEventListener("click", () => {

    const codigo = codigoPostal.value.trim();

// Validar que tenga 5 dígitos
    if (!/^\d{5}$/.test(codigo)) {
        resultadoEnvio.textContent =
            "Ingresa un código postal válido de 5 dígitos.";
        return;
    }

// Envío provisional
    resultadoEnvio.textContent =
        "🚚 Entrega estimada: 3 a 5 días hábiles · $99 MXN";

});

// Compartir producto
const enlaceProducto = window.location.href;

const compartirWhatsapp = document.getElementById("compartir-whatsapp");
const compartirFacebook = document.getElementById("compartir-facebook");
const botonCopiar = document.getElementById("copiar-enlace");
const mensajeCopiado = document.getElementById("mensaje-copiado");

const telefonoWhatsapp = "525641964434";

const mensajeWhatsapp =
    `Hola, me gustaría solicitar información sobre este producto de IMP AL3D: ${enlaceProducto}`;

compartirWhatsapp.href =
    `https://wa.me/${telefonoWhatsapp}?text=${encodeURIComponent(mensajeWhatsapp)}`;

compartirFacebook.href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(enlaceProducto)}`;

// Copiar enlace
botonCopiar.addEventListener("click", async () => {

    try {
        await navigator.clipboard.writeText(enlaceProducto);
        mensajeCopiado.textContent = "¡Enlace copiado!";
    } catch (error) {
        mensajeCopiado.textContent = "No se pudo copiar el enlace.";
        console.error(error);
    }

});

function alinearGaleria() {
    const galeria = document.querySelector(".producto-galeria");
    const info = document.querySelector(".producto-info");

    if (!galeria || !info) return;

    if (window.innerWidth <= 768) {
        galeria.style.height = "";
        return;
    }

    const compartir = info.lastElementChild;

    if (!compartir) return;

    galeria.style.height = "0px";

    const inicio = galeria.getBoundingClientRect().top;
    const final = compartir.getBoundingClientRect().bottom;

    const altura = Math.max(0, final - inicio);

    galeria.style.height = `${altura}px`;
}


function iniciarAlineacion() {
    alinearGaleria();
    if (document.fonts) {
        document.fonts.ready.then(alinearGaleria);
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(alinearGaleria);
    });
}

if (document.readyState === "complete") {
    iniciarAlineacion();
} else {
    window.addEventListener("load", iniciarAlineacion);
}

window.addEventListener("resize", alinearGaleria);