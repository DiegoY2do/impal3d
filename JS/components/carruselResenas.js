export function initCarruselResenas(containerSelector, cardSelector, indicatorSelector) {
    const contenedor = document.querySelector(containerSelector);

    if (!contenedor || contenedor.dataset.carruselInicializado === 'true') {
        return;
    }

    contenedor.dataset.carruselInicializado = 'true';

    const tarjetas = Array.from(contenedor.querySelectorAll(cardSelector));
    const indicadorContenedor = indicatorSelector
        ? document.querySelector(indicatorSelector)
        : null;

    if (!tarjetas.length) return;

    let indice = 0;
    let intervalo = null;
    let pausaTemporal = false;
    let temporizadorScroll = null;

    const mediaMovil = window.matchMedia('(max-width: 768px)');
    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');

    let indicadores = indicadorContenedor
        ? Array.from(indicadorContenedor.querySelectorAll('.indicador'))
        : [];

    if (indicadorContenedor && indicadores.length === 0) {
        tarjetas.forEach((_, index) => {
            const indicador = document.createElement('button');
            indicador.type = 'button';
            indicador.className = 'indicador';
            indicador.setAttribute('aria-label', `Ir a la reseña ${index + 1}`);

            indicador.addEventListener('click', () => {
                mostrarTarjeta(index);
                reiniciarIntervalo();
            });

            indicadorContenedor.appendChild(indicador);
        });

        indicadores = Array.from(indicadorContenedor.querySelectorAll('.indicador'));
    } else {
        indicadores.forEach((indicador, index) => {
            indicador.addEventListener('click', () => {
                mostrarTarjeta(index);
                reiniciarIntervalo();
            });
        });
    }

    function actualizarIndicadores(nuevoIndice) {
        indice = nuevoIndice;

        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('activo', index === indice);
            indicador.setAttribute('aria-current', index === indice ? 'true' : 'false');
            indicador.setAttribute('aria-pressed', index === indice ? 'true' : 'false');
        });

        tarjetas.forEach((tarjeta, index) => {
            tarjeta.classList.toggle('activa', index === indice);
        });
    }

    function indiceMasCercano() {
        const izquierdaContenedor = contenedor.getBoundingClientRect().left;
        let indiceCercano = 0;
        let distanciaMenor = Infinity;

        tarjetas.forEach((tarjeta, index) => {
            const distancia = Math.abs(
                tarjeta.getBoundingClientRect().left - izquierdaContenedor
            );

            if (distancia < distanciaMenor) {
                distanciaMenor = distancia;
                indiceCercano = index;
            }
        });

        return indiceCercano;
    }

    function mostrarTarjeta(nuevoIndice) {
        const indiceSeguro =
            (nuevoIndice + tarjetas.length) % tarjetas.length;

        if (!mediaMovil.matches) {
            actualizarIndicadores(indiceSeguro);
            return;
        }

        const tarjeta = tarjetas[indiceSeguro];
        const desplazamiento =
            contenedor.scrollLeft +
            tarjeta.getBoundingClientRect().left -
            contenedor.getBoundingClientRect().left;

        contenedor.scrollTo({
            left: desplazamiento,
            behavior: movimientoReducido.matches ? 'auto' : 'smooth'
        });

        actualizarIndicadores(indiceSeguro);
    }

    function detenerIntervalo() {
        if (intervalo) {
            window.clearInterval(intervalo);
            intervalo = null;
        }
    }

    function iniciarIntervalo() {
        detenerIntervalo();

        if (
            !mediaMovil.matches ||
            movimientoReducido.matches ||
            pausaTemporal ||
            document.hidden ||
            tarjetas.length < 2
        ) {
            return;
        }

        intervalo = window.setInterval(() => {
            mostrarTarjeta(indice + 1);
        }, 4500);
    }

    function reiniciarIntervalo() {
        detenerIntervalo();
        iniciarIntervalo();
    }

    contenedor.addEventListener('scroll', () => {
        window.clearTimeout(temporizadorScroll);

        temporizadorScroll = window.setTimeout(() => {
            actualizarIndicadores(indiceMasCercano());
            reiniciarIntervalo();
        }, 120);
    }, { passive: true });

    contenedor.addEventListener('mouseenter', () => {
        pausaTemporal = true;
        detenerIntervalo();
    });

    contenedor.addEventListener('mouseleave', () => {
        pausaTemporal = false;
        iniciarIntervalo();
    });

    contenedor.addEventListener('touchstart', () => {
        pausaTemporal = true;
        detenerIntervalo();
    }, { passive: true });

    contenedor.addEventListener('touchend', () => {
        pausaTemporal = false;
        reiniciarIntervalo();
    }, { passive: true });

    document.addEventListener('visibilitychange', reiniciarIntervalo);
    mediaMovil.addEventListener('change', reiniciarIntervalo);
    movimientoReducido.addEventListener('change', reiniciarIntervalo);

    actualizarIndicadores(0);
    iniciarIntervalo();
}
