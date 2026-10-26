export function initContactForm() {

    const formulario = document.getElementById("contactForm");

    if (!formulario) return;

    formulario.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const validarCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validarTelefono = /^\d{10}$/;

        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        if (!validarCorreo.test(correo)) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        if (!validarTelefono.test(telefono)) {
            alert("El teléfono debe contener exactamente 10 dígitos.");
            return;
        }

        if (mensaje.length < 10) {
            alert("El mensaje debe contener al menos 10 caracteres.");
            return;
        }

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const boton = document.getElementById("contactSubmit");
        const estado = document.getElementById("contactStatus");

        const datos = new FormData(formulario);

        boton.disabled = true;
        boton.textContent = "Enviando...";

        estado.hidden = true;

        try {

            const respuesta = await fetch(formulario.action, {
                method: "POST",
                body: datos,
                headers: {
                    Accept: "application/json"
                }
            });

            if (!respuesta.ok) {
                throw new Error("Error al enviar el formulario");
            }

            formulario.reset();

            estado.hidden = false;

            estado.classList.remove("contact-status-error");
            estado.classList.add("contact-status-success");

            estado.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            <span>
             ¡Mensaje enviado! Te responderemos en menos de un día hábil.
            </span>
            `;

            console.log("Formulario enviado y limpiado correctamente");

            console.log("Mensaje enviado correctamente a Formspree");

            estado.hidden = false;
            estado.classList.remove("contact-status-error");
            estado.classList.add("contact-status-success");

            estado.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            <span>
             ¡Mensaje enviado! Te responderemos en menos de un día hábil.
            </span>
            `;

        } catch (error) {

            console.error("Error:", error);

            estado.hidden = false;
            estado.classList.remove("contact-status-success");
            estado.classList.add("contact-status-error");

            estado.textContent = "No se pudo enviar el mensaje. Inténtalo nuevamente.";

        } finally {

            boton.disabled = false;
            boton.textContent = "Enviar mensaje";

        }

    });
}

