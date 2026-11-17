const cuentaHeader = document.querySelector('#cuenta-header');
const cuentaMain = document.querySelector('#cuenta-main');

cuentaHeader.innerHTML = `
    <a class="cuenta-logo" href="index.html" aria-label="Volver al inicio de IMP AL3D">
        <img src="assets/img/brand/logo-imp-al3d-negro.svg" alt="IMP AL3D" width="96" height="64">
    </a>
    <a class="cuenta-tienda" href="index.html">← Volver a la tienda</a>
`;

cuentaMain.innerHTML = `
    <section class="cuenta-intro">
        <h1>Tu cuenta IMP AL3D</h1>
        <p>Sigue tus pedidos, guarda favoritos y compra más rápido.</p>
    </section>

    <section class="cuenta-paneles">
        <article class="cuenta-panel" id="vista-registro">
            <h2>Crear cuenta</h2>
            <div
                id="registro-mensaje"
                class="cuenta-alerta"
                role="alert"
                aria-live="polite"
                hidden
            ></div>
            <form class="cuenta-formulario" id="formulario-registro" novalidate>
                <label for="registro-nombre">Nombre completo</label>
                <input id="registro-nombre" name="nombre" type="text" placeholder="Tu nombre" autocomplete="name">

                <label for="registro-correo">Correo electrónico</label>
                <input id="registro-correo" name="correo" type="email" placeholder="tu@correo.com" autocomplete="email">

                <label for="registro-telefono">Número de teléfono</label>
                <input 
                    id="registro-telefono"
                    name="telefono"
                    type="tel"
                    placeholder="55 1234 5678"
                    autocomplete="tel"
                >

                <label for="registro-contrasena">Contraseña</label>
                <input id="registro-contrasena" name="contrasena" type="password" placeholder="Mínimo 8 caracteres" autocomplete="new-password">
                <small>Usa al menos 8 caracteres, una mayúscula y un número.</small>

                <label for="registro-confirmacion">Confirmar contraseña</label>
                <input
                    id="registro-confirmacion"
                    name="confirmacion"
                    type="password"
                    placeholder="Escribe de nuevo tu contraseña"
                    autocomplete="new-password"
                >

                <label class="cuenta-terminos">
                    <input type="checkbox" name="terminos">
                    <span>Acepto los términos, condiciones y el aviso de privacidad.</span>
                </label>

                <button type="submit" class="cuenta-boton">Crear mi cuenta</button>
            </form>
            <p class="cuenta-cambio">¿Ya tienes cuenta? <a href="#vista-sesion">Inicia sesión</a></p>
        </article>

        <article class="cuenta-panel" id="vista-sesion" hidden>
            <h2>Iniciar sesión</h2>
            <form class="cuenta-formulario">
                <label for="sesion-correo">Correo electrónico</label>
                <input id="sesion-correo" name="correo" type="email" placeholder="tu@correo.com" autocomplete="email">

                <label for="sesion-contrasena">Contraseña</label>
                <input id="sesion-contrasena" name="contrasena" type="password" placeholder="Tu contraseña" autocomplete="current-password">

                <div class="cuenta-opciones">
                    <label class="cuenta-recordar">
                        <input type="checkbox" name="recordarme">
                        <span>Recordarme</span>
                    </label>
                    <a href="#vista-recuperar">¿Olvidaste tu contraseña?</a>
                </div>

                <button type="button" class="cuenta-boton">Entrar</button>
            </form>
            <div class="cuenta-separador"><span>o</span></div>
            <button type="button" class="cuenta-boton-google">Continuar con Google</button>
            <p class="cuenta-cambio">¿Aún no tienes cuenta? <a href="#vista-registro">Regístrate</a></p>
        </article>

        <article class="cuenta-panel" id="vista-recuperar" hidden>
            <h2>Recuperar contraseña</h2>
            <p class="cuenta-descripcion">
                Escribe tu correo y te enviaremos un enlace para crear una contraseña nueva.
            </p>

            <form class="cuenta-formulario">
                <label for="recuperar-correo">Correo electrónico</label>
                <input id="recuperar-correo" name="correo" type="email" placeholder="tu@correo.com" autocomplete="email">
                <button type="button" class="cuenta-boton">Enviar enlace</button>
            </form>

            <p class="cuenta-cambio">
                <a href="#vista-sesion">← Volver a iniciar sesión</a>
            </p>
        </article>
    </section>
`;

const vistas = document.querySelectorAll('.cuenta-panel');

document.querySelectorAll('a[href^="#vista-"]').forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
        evento.preventDefault();

        const idVista = enlace.getAttribute('href').slice(1);
        const vistaElegida = document.getElementById(idVista);

        if (!vistaElegida) return;

        vistas.forEach((vista) => {
            vista.hidden = vista !== vistaElegida;
        });

        history.replaceState(null, '', `#${idVista}`);
    });
});

const formularioRegistro = document.querySelector('#formulario-registro');
const mensajeRegistro = document.querySelector('#registro-mensaje');

formularioRegistro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector('#registro-nombre').value.trim();
    const correo = document.querySelector('#registro-correo').value.trim();
    const telefono = document.querySelector('#registro-telefono').value.trim();
    const digitosTelefono = telefono.replace(/\D/g, '');
    const contrasena = document.querySelector('#registro-contrasena').value;
    const confirmacion = document.querySelector('#registro-confirmacion').value;
    const aceptaTerminos = document.querySelector('[name="terminos"]').checked;

    const errores = [];

    if (!nombre) {
        errores.push('Escribe tu nombre completo.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
        errores.push('Escribe un correo electrónico válido.');
    }

    if (!/^(?:52)?\d{10}$/.test(digitosTelefono)) {
        errores.push('Escribe un teléfono válido de 10 dígitos, con código de país opcional.');
    }

    if (contrasena.length < 8 || !/[A-Z]/.test(contrasena) || !/\d/.test(contrasena)) {
        errores.push('La contraseña debe tener 8 caracteres, una mayúscula y un número.');
    }

    if (contrasena !== confirmacion) {
        errores.push('Las contraseñas no coinciden.');
    }

    if (!aceptaTerminos) {
        errores.push('Debes aceptar los términos y el aviso de privacidad.');
    }

    mensajeRegistro.hidden = false;
    mensajeRegistro.classList.remove('cuenta-alerta--error', 'cuenta-alerta--exito');

    if (errores.length > 0) {
        mensajeRegistro.classList.add('cuenta-alerta--error');
        mensajeRegistro.textContent = errores.join(' ');
        return;
    }

    const usuario = {
        nombre,
        correo,
        telefono: digitosTelefono,
        contrasena
    };

    mensajeRegistro.classList.add('cuenta-alerta--exito');
    mensajeRegistro.textContent = 'Datos válidos. Se generó el objeto JSON en la consola.';
    console.log(JSON.stringify(usuario, null, 2));
});