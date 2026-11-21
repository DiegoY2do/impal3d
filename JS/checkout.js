
import { checkoutData } from "../data/checkoutData.js";

// CONSTANTES

const ESTADOS = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
    "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
    "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo",
    "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
    "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
    "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán",
    "Zacatecas"
];

const METODOS_ENVIO = {
    standard: "Envío estándar (3 a 5 días hábiles)",
    express: "Envío express (1 a 2 días hábiles)"
};

const METODOS_PAGO = {
    card: "Tarjeta bancaria",
    transfer: "Transferencia SPEI",
    oxxo: "Pago en OXXO"
};

// Reglas de validación
const VALIDACIONES = {
    email: {
        test: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor),
        mensaje: "Ingresa un correo válido, por ejemplo: ejemplo@correo.com"
    },
    firstName: {
        test: (valor) => valor.length >= 2,
        mensaje: "Ingresa tu nombre."
    },
    lastName: {
        test: (valor) => valor.length >= 2,
        mensaje: "Ingresa tus apellidos."
    },
    address: {
        test: (valor) => valor.length >= 5,
        mensaje: "Ingresa tu calle y número."
    },
    neighborhood: {
        test: (valor) => valor.length >= 2,
        mensaje: "Ingresa tu colonia."
    },
    postalCode: {
        test: (valor) => /^\d{5}$/.test(valor),
        mensaje: "El código postal debe tener 5 dígitos."
    },
    city: {
        test: (valor) => valor.length >= 2,
        mensaje: "Ingresa tu ciudad."
    },
    state: {
        test: (valor) => valor !== "",
        mensaje: "Selecciona tu estado."
    }
};



// UTILIDADES

// FORMATEAR PRECIOS EN PESOS MEXICANOS
function formatPrice(amount) {
    return amount.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN"
    });
}

// EVITAR QUE EL TEXTO DEL USUARIO SE INTERPRETE COMO HTML
function escapeHTML(texto) {
    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}


// CÁLCULOS

function calculateSubtotal() {
    return checkoutData.productos.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
    }, 0);
}

function calculateDiscount() {
    return calculateSubtotal() * checkoutData.descuento;
}

function getShippingCost(metodo) {
    return metodo === "express"
        ? checkoutData.envioExpress
        : checkoutData.envioEstandar;
}

function calculateTotal(metodo = "standard") {
    return calculateSubtotal() - calculateDiscount() + getShippingCost(metodo);
}


// PLANTILLAS HTML


function renderCheckoutProducts() {
    return checkoutData.productos.map(producto => `
        <div class="summary-product">

            <div class="product-placeholder">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                >
            </div>

            <div class="product-info">
                <strong>${producto.nombre}</strong>
                <small>${producto.variante}</small>
                <small>Cantidad: ${producto.cantidad}</small>
            </div>

            <strong>
                ${formatPrice(producto.precio * producto.cantidad)}
            </strong>

        </div>
    `).join("");
}

function renderStateOptions() {
    return ESTADOS
        .map(estado => `<option value="${estado}">${estado}</option>`)
        .join("");
}

export function renderCheckout() {

    const porcentajeDescuento = Math.round(checkoutData.descuento * 100);

    return `
        <div class="checkout-page">

            <!-- ENCABEZADO -->
            <header class="checkout-header">
                <a href="./index.html" class="checkout-logo">
                    <img src="./assets/img/brand/logo-imp-al3d-negro.svg" alt="Logo de Impal3D" width="72" height="48">
                </a>

                <div class="checkout-security">
                    <i class="bi bi-lock-fill"></i>
                    Compra segura
                </div>
            </header>

            <!-- BARRA DE PROGRESO -->
            <section class="checkout-progress" aria-label="Progreso de la compra">

                <div class="progress-step active">
                    <span class="step-number">1</span>
                    <span>Información</span>
                </div>

                <div class="progress-line"></div>

                <div class="progress-step">
                    <span class="step-number">2</span>
                    <span>Envío</span>
                </div>

                <div class="progress-line"></div>

                <div class="progress-step">
                    <span class="step-number">3</span>
                    <span>Pago</span>
                </div>

            </section>

            <!-- CONTENIDO PRINCIPAL -->
            <div class="checkout-layout" id="checkout-layout">

                <!-- COLUMNA IZQUIERDA -->
                <form class="checkout-form" id="checkout-form" novalidate>

                    <!-- CONTACTO -->
                    <article class="checkout-card" data-step="1">

                        <h2>Contacto</h2>

                        <p class="checkout-description">
                            ¿Dónde podemos contactarte?
                        </p>

                        <div class="form-group">
                            <label for="email">Correo electrónico</label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="ejemplo@correo.com"
                                autocomplete="email"
                                required>

                            <small class="field-error" id="email-error"></small>
                        </div>

                        <div class="form-check">
                            <input
                                type="checkbox"
                                id="newsletter"
                                name="newsletter">

                            <label for="newsletter">
                                Enviarme novedades y ofertas por correo
                            </label>
                        </div>

                    </article>

                    <!-- DIRECCIÓN DE ENVÍO -->
                    <article class="checkout-card" data-step="1">

                        <h2>Dirección de envío</h2>

                        <p class="checkout-description">
                            ¿A dónde enviamos tu pedido?
                        </p>

                        <div class="form-row">

                            <div class="form-group">
                                <label for="firstName">Nombre</label>

                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Nombre"
                                    autocomplete="given-name"
                                    required>

                                <small class="field-error" id="firstName-error"></small>
                            </div>

                            <div class="form-group">
                                <label for="lastName">Apellidos</label>

                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Apellidos"
                                    autocomplete="family-name"
                                    required>

                                <small class="field-error" id="lastName-error"></small>
                            </div>

                        </div>

                        <div class="form-group">
                            <label for="address">Dirección</label>

                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Calle y número"
                                autocomplete="address-line1"
                                required>

                            <small class="field-error" id="address-error"></small>
                        </div>

                        <div class="form-group">
                            <label for="neighborhood">Colonia</label>

                            <input
                                type="text"
                                id="neighborhood"
                                name="neighborhood"
                                placeholder="Colonia"
                                autocomplete="address-line2"
                                required>

                            <small class="field-error" id="neighborhood-error"></small>
                        </div>

                        <div class="form-row">

                            <div class="form-group">
                                <label for="postalCode">Código postal</label>

                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    placeholder="00000"
                                    maxlength="5"
                                    inputmode="numeric"
                                    autocomplete="postal-code"
                                    required>

                                <small class="field-error" id="postalCode-error"></small>
                            </div>

                            <div class="form-group">
                                <label for="city">Ciudad</label>

                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Ciudad"
                                    autocomplete="address-level2"
                                    required>

                                <small class="field-error" id="city-error"></small>
                            </div>

                        </div>

                        <div class="form-group">
                            <label for="state">Estado</label>

                            <select id="state" name="state" autocomplete="address-level1" required>
                                <option value="">Selecciona tu estado</option>
                                ${renderStateOptions()}
                            </select>

                            <small class="field-error" id="state-error"></small>
                        </div>

                        <div class="form-group">
                            <label for="references">Referencias (opcional)</label>

                            <textarea
                                id="references"
                                name="references"
                                placeholder="Indicaciones para encontrar tu domicilio"
                            ></textarea>
                        </div>

                    </article>

                    <!-- MÉTODO DE ENVÍO -->
                    <article class="checkout-card" data-step="2">

                        <h2>Método de envío</h2>

                        <div class="shipping-options">

                            <label class="option-card">
                                <input type="radio" name="shipping" value="standard" checked>

                                <span>
                                    <strong>Envío estándar</strong>
                                    <small>3 a 5 días hábiles</small>
                                </span>

                                <strong>${formatPrice(checkoutData.envioEstandar)}</strong>
                            </label>

                            <label class="option-card">
                                <input type="radio" name="shipping" value="express">

                                <span>
                                    <strong>Envío express</strong>
                                    <small>1 a 2 días hábiles</small>
                                </span>

                                <strong>${formatPrice(checkoutData.envioExpress)}</strong>
                            </label>

                        </div>

                    </article>

                    <!-- MÉTODO DE PAGO -->
                    <article class="checkout-card" data-step="3">

                        <h2>Método de pago</h2>

                        <p class="checkout-description">
                            Selecciona cómo deseas pagar.
                        </p>

                        <div class="payment-options">

                            <label class="option-card">
                                <input type="radio" name="payment" value="card" checked>

                                <span>
                                    <strong>Tarjeta bancaria</strong>
                                    <small>Crédito o débito</small>
                                </span>

                                <i class="bi bi-credit-card"></i>
                            </label>

                            <label class="option-card">
                                <input type="radio" name="payment" value="transfer">

                                <span>
                                    <strong>Transferencia SPEI</strong>
                                    <small>Transferencia bancaria</small>
                                </span>

                                <i class="bi bi-bank"></i>
                            </label>

                            <label class="option-card">
                                <input type="radio" name="payment" value="oxxo">

                                <span>
                                    <strong>Pago en OXXO</strong>
                                    <small>Pago en efectivo</small>
                                </span>

                                <i class="bi bi-shop"></i>
                            </label>

                        </div>

                    </article>

                </form>

                <!-- COLUMNA DERECHA -->
                <aside class="checkout-summary">

                    <article class="checkout-card">

                        <h2>Resumen del pedido</h2>

                        <div id="checkout-products">
                            ${renderCheckoutProducts()}
                        </div>

                        <hr>

                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span id="checkout-subtotal">
                                ${formatPrice(calculateSubtotal())}
                            </span>
                        </div>

                        <div class="summary-row">
                            <span>Descuento de bienvenida (${porcentajeDescuento}%)</span>
                            <span id="checkout-discount">
                                -${formatPrice(calculateDiscount())}
                            </span>
                        </div>

                        <div class="summary-row">
                            <span>Envío</span>
                            <span id="shipping-cost">
                                ${formatPrice(checkoutData.envioEstandar)}
                            </span>
                        </div>

                        <hr>

                        <div class="summary-row summary-total">
                            <strong>Total</strong>
                            <strong id="checkout-total">
                                ${formatPrice(calculateTotal("standard"))}
                            </strong>
                        </div>

                        <!-- form="checkout-form" conecta este botón con el formulario de la izquierda -->
                        <button
                            type="submit"
                            form="checkout-form"
                            class="checkout-button"
                            id="finish-order"
                        >
                            Finalizar compra
                            <i class="bi bi-arrow-right"></i>
                        </button>

                        <p class="checkout-terms">
                            Al continuar, aceptas nuestros términos
                            y condiciones.
                        </p>

                    </article>

                </aside>

            </div>

        </div>
    `;
}

function renderConfirmation(pedido) {

    const instrucciones = {
        card: "Recibirás la confirmación del cargo a tu tarjeta en tu correo.",
        transfer: "Te enviamos por correo la CLABE y la referencia para tu transferencia SPEI.",
        oxxo: "Te enviamos por correo la referencia para pagar en cualquier tienda OXXO."
    };

    return `
        <section class="checkout-card checkout-confirmation">

            <div class="confirmation-icon">
                <i class="bi bi-check-lg"></i>
            </div>

            <h2>¡Gracias por tu compra, ${escapeHTML(pedido.cliente.nombre)}!</h2>

            <p class="checkout-description">
                Tu pedido <strong>${pedido.numero}</strong> fue registrado.
                Enviamos los detalles a <strong>${escapeHTML(pedido.cliente.email)}</strong>.
            </p>

            <div class="confirmation-details">
                <div class="summary-row">
                    <span>Envío a</span>
                    <span>${escapeHTML(pedido.direccion.ciudad)}, ${escapeHTML(pedido.direccion.estado)}</span>
                </div>
                <div class="summary-row">
                    <span>Método de envío</span>
                    <span>${METODOS_ENVIO[pedido.envio]}</span>
                </div>
                <div class="summary-row">
                    <span>Método de pago</span>
                    <span>${METODOS_PAGO[pedido.pago]}</span>
                </div>
                <div class="summary-row summary-total">
                    <strong>Total</strong>
                    <strong>${formatPrice(pedido.total)}</strong>
                </div>
            </div>

            <p class="checkout-description">${instrucciones[pedido.pago]}</p>

            <a href="./index.html" class="checkout-button">
                Volver a la tienda
                <i class="bi bi-arrow-right"></i>
            </a>

        </section>
    `;
}

// INTERACCIÓN

// ACTUALIZAR ENVÍO Y TOTAL
function updateTotals(metodoEnvio) {
    document.getElementById("shipping-cost").textContent =
        formatPrice(getShippingCost(metodoEnvio));

    document.getElementById("checkout-total").textContent =
        formatPrice(calculateTotal(metodoEnvio));
}

// BARRA DE PROGRESO
function setProgressStep(paso) {
    const pasos = document.querySelectorAll(".progress-step");

    pasos.forEach((elemento, indice) => {
        const numero = indice + 1;
        elemento.classList.toggle("active", numero === paso);
        elemento.classList.toggle("completed", numero < paso);
    });
}

// VALIDAR UN CAMPO Y MOSTRAR SU MENSAJE
function validateField(campo) {
    const regla = VALIDACIONES[campo.name];
    if (!regla) return true;

    const esValido = regla.test(campo.value.trim());
    const error = document.getElementById(`${campo.id}-error`);

    campo.classList.toggle("is-invalid", !esValido);
    campo.setAttribute("aria-invalid", String(!esValido));

    if (error) {
        error.textContent = esValido ? "" : regla.mensaje;
    }

    return esValido;
}

// VALIDACION
function validateForm(form) {
    const campos = Object.keys(VALIDACIONES).map(nombre => form.elements[nombre]);
    const invalidos = campos.filter(campo => !validateField(campo));

    if (invalidos.length > 0) {
        invalidos[0].focus();
        invalidos[0].scrollIntoView({ behavior: "smooth", block: "center" });
        return false;
    }

    return true;
}

// OBJETO PEDIDO
function buildOrder(form) {
    const datos = new FormData(form);
    const envio = datos.get("shipping");

    return {
        numero: `IMP-${Date.now().toString().slice(-6)}`,
        fecha: new Date().toISOString(),
        cliente: {
            nombre: datos.get("firstName").trim(),
            apellidos: datos.get("lastName").trim(),
            email: datos.get("email").trim(),
            newsletter: datos.get("newsletter") === "on"
        },
        direccion: {
            calle: datos.get("address").trim(),
            colonia: datos.get("neighborhood").trim(),
            codigoPostal: datos.get("postalCode").trim(),
            ciudad: datos.get("city").trim(),
            estado: datos.get("state"),
            referencias: datos.get("references").trim()
        },
        productos: checkoutData.productos,
        envio,
        pago: datos.get("payment"),
        subtotal: calculateSubtotal(),
        descuento: calculateDiscount(),
        costoEnvio: getShippingCost(envio),
        total: calculateTotal(envio)
    };
}

// CONECTAR TODOS LOS EVENTOS
function initCheckout() {
    const form = document.getElementById("checkout-form");
    const boton = document.getElementById("finish-order");

    // Cambiar el envío actualiza el resumen
    form.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener("change", () => updateTotals(radio.value));
    });

    // La barra de progreso sigue a la sección en la que está el usuario
    form.querySelectorAll(".checkout-card[data-step]").forEach(card => {
        card.addEventListener("focusin", () => {
            setProgressStep(Number(card.dataset.step));
        });
    });

    // El código postal solo acepta números
    form.elements.postalCode.addEventListener("input", (evento) => {
        evento.target.value = evento.target.value.replace(/\D/g, "").slice(0, 5);
    });

    // Validar al salir de un campo, y quitar el error en cuanto se corrige
    Object.keys(VALIDACIONES).forEach(nombre => {
        const campo = form.elements[nombre];

        campo.addEventListener("blur", () => {
            if (campo.value.trim() !== "") validateField(campo);
        });

        campo.addEventListener(campo.tagName === "SELECT" ? "change" : "input", () => {
            if (campo.classList.contains("is-invalid")) validateField(campo);
        });
    });

    // Enviar el pedido
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!validateForm(form)) {
            setProgressStep(1);
            return;
        }

        const pedido = buildOrder(form);

        boton.disabled = true;
        boton.innerHTML = `Procesando pedido...`;

        // Simular la respuesta del servidor
        setTimeout(() => {
            try {
                localStorage.setItem("ultimoPedido", JSON.stringify(pedido));

                // Vaciar el carrito después de comprar
                if (USAR_CARRITO_REAL) {
                    localStorage.removeItem("carrito");
                }
            } catch (error) {
                console.warn("No se pudo guardar el pedido:", error);
            }

            document.querySelectorAll(".progress-step").forEach(paso => {
                paso.classList.remove("active");
                paso.classList.add("completed");
            });

            const layout = document.getElementById("checkout-layout");
            layout.classList.add("is-confirmed");
            layout.innerHTML = renderConfirmation(pedido);

            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 800);
    });
}

// CARGAR PRODUCTOS DEL CARRITO


const USAR_CARRITO_REAL = false;

function getCart() {
    if (USAR_CARRITO_REAL) {
        try {

            return JSON.parse(localStorage.getItem("carrito") || "[]");
        } catch {
            return [];
        }
    }

    return checkoutData.carritoPrueba;
}

async function loadCartProducts() {
    // Ruta relativa a checkout.html
    const respuesta = await fetch("./data/productos.json");

    if (!respuesta.ok) {
        throw new Error(`No se pudo leer productos.json (${respuesta.status})`);
    }

    const catalogo = await respuesta.json();

    return getCart()
        .map(item => {
            const producto = catalogo.find(p => p.id === Number(item.id));
            if (!producto) return null;

            return {
                id: producto.id,
                nombre: producto.nombre,
                variante: `${producto.categoria} · Tamaño ${producto.tamaño}`,
                precio: producto.precio,

                cantidad: Number(item.cantidad) || 1,
                imagen: producto.imagenes?.[0] ?? ""
            };
        })
        .filter(Boolean);
}

function renderEmptyCart(mensaje) {
    return `
        <div class="checkout-page">
            <div class="checkout-layout is-confirmed">
                <section class="checkout-card checkout-confirmation">
                    <h2>${mensaje}</h2>
                    <a href="./index.html" class="checkout-button">
                        Ir a la tienda
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </section>
            </div>
        </div>
    `;
}

// RENDERIZAR CHECKOUT

document.addEventListener("DOMContentLoaded", async () => {

    const checkoutContainer = document.getElementById("checkout-container");
    if (!checkoutContainer) return;

    try {
        checkoutData.productos = await loadCartProducts();
    } catch (error) {
        console.error("Error al cargar el carrito:", error);
        checkoutContainer.innerHTML = renderEmptyCart("No pudimos cargar tu pedido. Intenta de nuevo.");
        return;
    }

    if (checkoutData.productos.length === 0) {
        checkoutContainer.innerHTML = renderEmptyCart("Tu carrito está vacío");
        return;
    }

    checkoutContainer.innerHTML = renderCheckout();
    initCheckout();
});