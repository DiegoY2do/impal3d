import { checkoutData } from "../data/checkoutData.js";

// =========================================================
// CONFIGURACIÓN
// =========================================================

// Cambia a true cuando el carrito real (localStorage "carrito") esté listo
const USAR_CARRITO_REAL = false;

const TOTAL_PASOS = 3;

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

// Reglas de validación del paso 1
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

// =========================================================
// ESTADO DEL CHECKOUT
// =========================================================

let pasoActual = 1;
let cuponAplicado = null; // { codigo: "IMPAL10", porcentaje: 0.10 }

// =========================================================
// UTILIDADES
// =========================================================

function formatPrice(amount) {
    return amount.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN"
    });
}

// Evita que el texto del usuario se interprete como HTML
function escapeHTML(texto) {
    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function getSelectedValue(nombre) {
    return document.querySelector(`input[name="${nombre}"]:checked`)?.value;
}

// =========================================================
// CÁLCULOS
// =========================================================

function calculateSubtotal() {
    return checkoutData.productos.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
    }, 0);
}

function calculateDiscount() {
    return calculateSubtotal() * checkoutData.descuento;
}

function calculateCouponDiscount() {
    return cuponAplicado ? calculateSubtotal() * cuponAplicado.porcentaje : 0;
}

function getShippingCost(metodo) {
    return metodo === "express"
        ? checkoutData.envioExpress
        : checkoutData.envioEstandar;
}

function calculateTotal(metodo = "standard") {
    return calculateSubtotal()
        - calculateDiscount()
        - calculateCouponDiscount()
        + getShippingCost(metodo);
}

// =========================================================
// PLANTILLAS HTML
// =========================================================

function renderCheckoutProducts() {
    return checkoutData.productos.map(producto => `
        <div class="summary-product">

            <div class="product-placeholder">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            </div>

            <div class="product-info">
                <strong>${producto.nombre}</strong>
                <small>${producto.variante}</small>
                <small>Cantidad: ${producto.cantidad}</small>
            </div>

            <strong>${formatPrice(producto.precio * producto.cantidad)}</strong>

        </div>
    `).join("");
}

function renderStateOptions() {
    return ESTADOS
        .map(estado => `<option value="${estado}">${estado}</option>`)
        .join("");
}

function renderProgress() {
    const pasos = ["Información", "Envío", "Pago"];

    return pasos.map((nombre, indice) => `
        ${indice > 0 ? '<div class="progress-line"></div>' : ""}
        <button type="button" class="progress-step ${indice === 0 ? "active" : ""}" data-go-step="${indice + 1}" disabled>
            <span class="step-number">${indice + 1}</span>
            <span>${nombre}</span>
        </button>
    `).join("");
}

export function renderCheckout() {

    const porcentajeBienvenida = Math.round(checkoutData.descuento * 100);

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
            <nav class="checkout-progress" id="checkout-progress" aria-label="Pasos de la compra">
                ${renderProgress()}
            </nav>

            <!-- CONTENIDO PRINCIPAL -->
            <div class="checkout-layout" id="checkout-layout">

                <!-- COLUMNA IZQUIERDA: UN PASO A LA VEZ -->
                <form class="checkout-form" id="checkout-form" novalidate>

                    <!-- ===================== PASO 1: INFORMACIÓN ===================== -->
                    <section class="checkout-step" data-step="1" aria-label="Paso 1: Información">

                        <!-- CONTACTO -->
                        <article class="checkout-card">

                            <h2 tabindex="-1">Contacto</h2>

                            <p class="checkout-description">¿Dónde podemos contactarte?</p>

                            <div class="form-group">
                                <label for="email">Correo electrónico</label>
                                <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" autocomplete="email" required>
                                <small class="field-error" id="email-error"></small>
                            </div>

                            <div class="form-check">
                                <input type="checkbox" id="newsletter" name="newsletter">
                                <label for="newsletter">Enviarme novedades y ofertas por correo</label>
                            </div>

                        </article>

                        <!-- DIRECCIÓN DE ENVÍO -->
                        <article class="checkout-card">

                            <h2>Dirección de envío</h2>

                            <p class="checkout-description">¿A dónde enviamos tu pedido?</p>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstName">Nombre</label>
                                    <input type="text" id="firstName" name="firstName" placeholder="Nombre" autocomplete="given-name" required>
                                    <small class="field-error" id="firstName-error"></small>
                                </div>

                                <div class="form-group">
                                    <label for="lastName">Apellidos</label>
                                    <input type="text" id="lastName" name="lastName" placeholder="Apellidos" autocomplete="family-name" required>
                                    <small class="field-error" id="lastName-error"></small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="address">Dirección</label>
                                <input type="text" id="address" name="address" placeholder="Calle y número" autocomplete="address-line1" required>
                                <small class="field-error" id="address-error"></small>
                            </div>

                            <div class="form-group">
                                <label for="neighborhood">Colonia</label>
                                <input type="text" id="neighborhood" name="neighborhood" placeholder="Colonia" autocomplete="address-line2" required>
                                <small class="field-error" id="neighborhood-error"></small>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="postalCode">Código postal</label>
                                    <input type="text" id="postalCode" name="postalCode" placeholder="00000" maxlength="5" inputmode="numeric" autocomplete="postal-code" required>
                                    <small class="field-error" id="postalCode-error"></small>
                                </div>

                                <div class="form-group">
                                    <label for="city">Ciudad</label>
                                    <input type="text" id="city" name="city" placeholder="Ciudad" autocomplete="address-level2" required>
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
                                <textarea id="references" name="references" placeholder="Indicaciones para encontrar tu domicilio"></textarea>
                            </div>

                        </article>

                        <div class="step-actions">
                            <a href="./index.html" class="step-back">
                                <i class="bi bi-arrow-left"></i>
                                Volver a la tienda
                            </a>

                            <button type="button" class="checkout-button" data-next>
                                Continuar a envío
                                <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>

                    </section>

                    <!-- ===================== PASO 2: ENVÍO ===================== -->
                    <section class="checkout-step" data-step="2" aria-label="Paso 2: Envío" hidden>

                        <div class="review-box" id="review-step-2"></div>

                        <article class="checkout-card">

                            <h2 tabindex="-1">Método de envío</h2>

                            <p class="checkout-description">Elige qué tan rápido quieres recibir tu pedido.</p>

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

                        <div class="step-actions">
                            <button type="button" class="step-back" data-prev>
                                <i class="bi bi-arrow-left"></i>
                                Volver a información
                            </button>

                            <button type="button" class="checkout-button" data-next>
                                Continuar a pago
                                <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>

                    </section>

                    <!-- ===================== PASO 3: PAGO ===================== -->
                    <section class="checkout-step" data-step="3" aria-label="Paso 3: Pago" hidden>

                        <div class="review-box" id="review-step-3"></div>

                        <article class="checkout-card">

                            <h2 tabindex="-1">Método de pago</h2>

                            <p class="checkout-description">Selecciona cómo deseas pagar.</p>

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

                        <div class="step-actions">
                            <button type="button" class="step-back" data-prev>
                                <i class="bi bi-arrow-left"></i>
                                Volver a envío
                            </button>

                            <button type="submit" class="checkout-button" id="finish-order">
                                Finalizar compra
                                <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>

                        <p class="checkout-terms">
                            Al finalizar tu compra, aceptas nuestros términos y condiciones.
                        </p>

                    </section>

                </form>

                <!-- COLUMNA DERECHA: RESUMEN (visible en todos los pasos) -->
                <aside class="checkout-summary">

                    <article class="checkout-card">

                        <h2>Resumen del pedido</h2>

                        <div id="checkout-products">
                            ${renderCheckoutProducts()}
                        </div>

                        <!-- CUPÓN -->
                        <div class="coupon">
                            <label for="coupon-code">¿Tienes un cupón?</label>

                            <div class="coupon-field">
                                <input type="text" id="coupon-code" placeholder="Código de descuento" autocomplete="off" spellcheck="false">
                                <button type="button" id="apply-coupon">Aplicar</button>
                            </div>

                            <small class="coupon-message" id="coupon-message" aria-live="polite"></small>
                        </div>

                        <hr>

                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span id="checkout-subtotal">${formatPrice(calculateSubtotal())}</span>
                        </div>

                        ${checkoutData.descuento > 0 ? `
                        <div class="summary-row summary-discount">
                            <span>Descuento de bienvenida (${porcentajeBienvenida}%)</span>
                            <span id="checkout-discount">-${formatPrice(calculateDiscount())}</span>
                        </div>` : ""}

                        <div class="summary-row summary-discount" id="coupon-row" hidden>
                            <span>
                                Cupón <strong id="coupon-name"></strong>
                                <button type="button" class="coupon-remove" id="remove-coupon">Quitar</button>
                            </span>
                            <span id="coupon-discount"></span>
                        </div>

                        <div class="summary-row">
                            <span>Envío</span>
                            <span id="shipping-cost">${formatPrice(checkoutData.envioEstandar)}</span>
                        </div>

                        <hr>

                        <div class="summary-row summary-total">
                            <strong>Total</strong>
                            <strong id="checkout-total">${formatPrice(calculateTotal("standard"))}</strong>
                        </div>

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
                ${pedido.cupon ? `
                <div class="summary-row">
                    <span>Cupón</span>
                    <span>${pedido.cupon}</span>
                </div>` : ""}
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

// Tarjetas de "revisión" que se ven arriba de los pasos 2 y 3
function renderReview(paso) {
    const form = document.getElementById("checkout-form");
    const valor = (nombre) => escapeHTML(form.elements[nombre].value.trim());

    const filas = [
        {
            titulo: "Contacto",
            contenido: valor("email"),
            irA: 1
        },
        {
            titulo: "Enviar a",
            contenido: `${valor("firstName")} ${valor("lastName")}<br>
                        ${valor("address")}, ${valor("neighborhood")}<br>
                        ${valor("postalCode")} ${valor("city")}, ${valor("state")}`,
            irA: 1
        }
    ];

    if (paso === 3) {
        const envio = getSelectedValue("shipping");
        filas.push({
            titulo: "Envío",
            contenido: `${METODOS_ENVIO[envio]} · ${formatPrice(getShippingCost(envio))}`,
            irA: 2
        });
    }

    return filas.map(fila => `
        <div class="review-row">
            <span class="review-title">${fila.titulo}</span>
            <span class="review-content">${fila.contenido}</span>
            <button type="button" class="review-edit" data-go-step="${fila.irA}">Cambiar</button>
        </div>
    `).join("");
}

// =========================================================
// NAVEGACIÓN ENTRE PASOS
// =========================================================

// BARRA DE PROGRESO (1 = Información, 2 = Envío, 3 = Pago)
function setProgressStep(paso = pasoActual) {
    document.querySelectorAll(".progress-step").forEach(boton => {
        const numero = Number(boton.dataset.goStep);

        boton.classList.toggle("active", numero === paso);
        boton.classList.toggle("completed", numero < paso);

        // Solo se puede regresar a pasos ya completados
        boton.disabled = numero >= paso;

        if (numero === paso) {
            boton.setAttribute("aria-current", "step");
        } else {
            boton.removeAttribute("aria-current");
        }
    });
}

function goToStep(paso) {
    pasoActual = Math.min(Math.max(paso, 1), TOTAL_PASOS);

    document.querySelectorAll(".checkout-step").forEach(seccion => {
        seccion.hidden = Number(seccion.dataset.step) !== pasoActual;
    });

    if (pasoActual === 2) {
        document.getElementById("review-step-2").innerHTML = renderReview(2);
    }

    if (pasoActual === 3) {
        document.getElementById("review-step-3").innerHTML = renderReview(3);
    }

    setProgressStep();

    // Subir al inicio y llevar el foco al título del paso
    document.getElementById("checkout-progress").scrollIntoView({ behavior: "smooth", block: "start" });

    const titulo = document.querySelector(`.checkout-step[data-step="${pasoActual}"] h2`);
    titulo?.focus({ preventScroll: true });
}

// Valida el paso actual antes de avanzar
function canLeaveStep(paso) {
    if (paso === 1) {
        return validateForm(document.getElementById("checkout-form"));
    }
    return true; 
}

// =========================================================
// VALIDACIÓN
// =========================================================

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

// VALIDAR TODO EL FORMULARIO (los campos del paso 1)
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

// =========================================================
// RESUMEN Y CUPÓN
// =========================================================

function updateTotals() {
    const envio = getSelectedValue("shipping") || "standard";

    document.getElementById("shipping-cost").textContent = formatPrice(getShippingCost(envio));
    document.getElementById("checkout-total").textContent = formatPrice(calculateTotal(envio));

    const filaCupon = document.getElementById("coupon-row");
    filaCupon.hidden = !cuponAplicado;

    if (cuponAplicado) {
        const porcentaje = Math.round(cuponAplicado.porcentaje * 100);
        document.getElementById("coupon-name").textContent = `${cuponAplicado.codigo} (${porcentaje}%)`;
        document.getElementById("coupon-discount").textContent = `-${formatPrice(calculateCouponDiscount())}`;
    }
}

function showCouponMessage(texto, tipo) {
    const mensaje = document.getElementById("coupon-message");
    mensaje.textContent = texto;
    mensaje.className = `coupon-message ${tipo}`;
}

function applyCoupon() {
    const input = document.getElementById("coupon-code");
    const codigo = input.value.trim().toUpperCase();

    if (codigo === "") {
        showCouponMessage("Escribe un código de cupón.", "is-error");
        input.focus();
        return;
    }

    const porcentaje = checkoutData.cupones?.[codigo];

    if (!porcentaje) {
        showCouponMessage("Este cupón no es válido o ya expiró.", "is-error");
        input.classList.add("is-invalid");
        input.focus();
        return;
    }

    cuponAplicado = { codigo, porcentaje };
    input.value = "";
    input.classList.remove("is-invalid");
    showCouponMessage(`¡Listo! Cupón ${codigo} aplicado.`, "is-success");
    updateTotals();
}

function removeCoupon() {
    cuponAplicado = null;
    showCouponMessage("", "");
    updateTotals();
}

// =========================================================
// PEDIDO
// =========================================================

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
        cupon: cuponAplicado?.codigo ?? null,
        subtotal: calculateSubtotal(),
        descuento: calculateDiscount(),
        descuentoCupon: calculateCouponDiscount(),
        costoEnvio: getShippingCost(envio),
        total: calculateTotal(envio)
    };
}

function finishOrder(form) {
    const boton = document.getElementById("finish-order");
    const pedido = buildOrder(form);

    boton.disabled = true;
    boton.textContent = "Procesando pedido...";

    // Simular la respuesta del servidor
    setTimeout(() => {
        try {
            localStorage.setItem("ultimoPedido", JSON.stringify(pedido));

            if (USAR_CARRITO_REAL) {
                localStorage.removeItem("carrito");
            }
        } catch (error) {
            console.warn("No se pudo guardar el pedido:", error);
        }

        document.querySelectorAll(".progress-step").forEach(paso => {
            paso.classList.remove("active");
            paso.classList.add("completed");
            paso.disabled = true;
        });

        const layout = document.getElementById("checkout-layout");
        layout.classList.add("is-confirmed");
        layout.innerHTML = renderConfirmation(pedido);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
}

// =========================================================
// EVENTOS
// =========================================================

function initCheckout() {
    const form = document.getElementById("checkout-form");
    const pagina = document.querySelector(".checkout-page");

    // Botones "Continuar", "Volver", "Cambiar" y pasos de la barra superior
    pagina.addEventListener("click", (evento) => {
        const siguiente = evento.target.closest("[data-next]");
        const anterior = evento.target.closest("[data-prev]");
        const irAPaso = evento.target.closest("[data-go-step]");

        if (siguiente) {
            if (canLeaveStep(pasoActual)) goToStep(pasoActual + 1);
        } else if (anterior) {
            goToStep(pasoActual - 1);
        } else if (irAPaso && !irAPaso.disabled) {
            goToStep(Number(irAPaso.dataset.goStep));
        }
    });

    // Enviar el formulario (botón "Finalizar compra" o Enter en un campo)
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        // Si presionan Enter antes del último paso, solo avanzamos
        if (pasoActual < TOTAL_PASOS) {
            if (canLeaveStep(pasoActual)) goToStep(pasoActual + 1);
            return;
        }

        // Revisión final por seguridad
        if (!validateForm(form)) {
            goToStep(1);
            validateForm(form);
            return;
        }

        finishOrder(form);
    });

    // Cambiar el envío actualiza el resumen
    form.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener("change", updateTotals);
    });

    // El código postal solo acepta números
    form.elements.postalCode.addEventListener("input", (evento) => {
        evento.target.value = evento.target.value.replace(/\D/g, "").slice(0, 5);
    });

    // Validar al salir del campo y quitar el error en cuanto se corrige
    Object.keys(VALIDACIONES).forEach(nombre => {
        const campo = form.elements[nombre];

        campo.addEventListener("blur", () => {
            if (campo.value.trim() !== "") validateField(campo);
        });

        campo.addEventListener(campo.tagName === "SELECT" ? "change" : "input", () => {
            if (campo.classList.contains("is-invalid")) validateField(campo);
        });
    });

    // Cupón
    const inputCupon = document.getElementById("coupon-code");

    document.getElementById("apply-coupon").addEventListener("click", applyCoupon);
    document.getElementById("remove-coupon").addEventListener("click", removeCoupon);

    inputCupon.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            evento.preventDefault();
            applyCoupon();
        }
    });

    inputCupon.addEventListener("input", () => {
        inputCupon.classList.remove("is-invalid");
    });

    setProgressStep();
}

// CARGAR PRODUCTOS DEL CARRITO

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
                // Si "desc" es un descuento por producto, usar esta línea en su lugar:
                // precio: producto.precio * (1 - (producto.desc || 0) / 100),
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

// =========================================================
// INICIO
// =========================================================

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