// ---------- Qué se anima ----------
const TITULOS = 'h1, h2';                                     // caen desde arriba, palabra por palabra
const TEXTOS = 'h3, h4, h5, h6, p, span, .badge-morado';      // suben con fade
const BOTONES = '.container-btn > *';                         // aparecen con rebote
const CAJAS = '.inicio-img, .about-img, .mapa-contenedor';    // se revelan de arriba hacia abajo
const TARJETAS = '.pregunta, .inicio-aviso, .newsletter';     // suben escalonadas
const IMAGENES = '.inicio-img img, .about-img img';           // se esperan antes de arrancar

// Qué se queda quieto
const EXCLUIR = '.news-msg, .pregunta p, [aria-hidden="true"], header';

// Texto que ya vive dentro de otro elemento que se anima: no se anima aparte
const CONTENEDORES = 'h1, h2, h3, h4, h5, h6, p, a, button, summary';
const AGRUPADOS = `${CAJAS}, ${TARJETAS}`;

// Espera a que las fuentes y las imágenes grandes estén listas.
// Si algo falla o tarda más de 1.5 s, arranca igual.
function esperarRecursos() {
    const fuentes = Promise.all([
        document.fonts.load('700 1em Sora'),
        document.fonts.load('400 1em "DM Sans"')
    ])
        .then(() => document.fonts.ready)
        .catch(() => {});

    const imagenes = Promise.all(
        gsap.utils.toArray(IMAGENES).map((img) => img.decode().catch(() => {}))
    );

    const limite = new Promise((resolve) => setTimeout(resolve, 1500));

    return Promise.race([Promise.all([fuentes, imagenes]), limite]);
}

// Punto de activación: cuando la parte de arriba del elemento llega a `pct` de la altura
// de la ventana, pero nunca más allá del final real de la página. Así:
//  - lo que queda al final de una página larga entra al llegar al fondo
//  - en páginas con poco contenido (sin scroll) todo entra solo, sin tener que moverse
const inicio = (pct) => (self) => {
    const arriba = self.trigger.getBoundingClientRect().top + window.scrollY;
    return Math.min(arriba - window.innerHeight * pct, ScrollTrigger.maxScroll(window) - 2);
};

// Deja los elementos ocultos y los hace entrar cuando llegan a la vista
function entrada(elementos, desde, hasta) {
    if (!elementos.length) return;

    gsap.set(elementos, desde);

    ScrollTrigger.batch(elementos, {
        start: inicio(0.9),
        once: true,
        onEnter: (grupo) =>
            gsap.to(grupo, { ...hasta, clearProps: 'opacity,transform,transition' })
    });
}

// Flotado continuo de la imagen del hero (arranca al terminar su revelación)
function flotar(img) {
    gsap.to(img, {
        y: -14,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
}

export async function initAnimaciones() {
    const raiz = document.documentElement;

    if (!window.gsap || !window.ScrollTrigger) {
        raiz.classList.remove('js-anim');
        return;
    }

    await esperarRecursos();

    gsap.registerPlugin(...[window.ScrollTrigger, window.SplitText].filter(Boolean));

    const mm = gsap.matchMedia();

    // Solo anima si el usuario no pidió reducir el movimiento
    mm.add('(prefers-reduced-motion: no-preference)', () => {
        const libre = (el) => !el.closest(EXCLUIR);
        const suelto = (el) => libre(el) && !el.closest(AGRUPADOS);
        const sinPadre = (el) => !el.parentElement.closest(CONTENEDORES);
        const buscar = (selector) => gsap.utils.toArray(selector);

        // Se listan antes de dividir los títulos para no contar lo que crea SplitText
        const titulos = buscar(TITULOS).filter(suelto);
        const textos = buscar(TEXTOS).filter((el) => suelto(el) && sinPadre(el));
        const botones = buscar(BOTONES).filter(libre);
        const cajas = buscar(CAJAS).filter(libre);
        const tarjetas = buscar(TARJETAS).filter(libre);

        // 1) Títulos: caen desde arriba, palabra por palabra
        if (window.SplitText) {
            titulos.forEach((titulo) => {
                SplitText.create(titulo, {
                    type: 'lines,words',
                    mask: 'lines',
                    autoSplit: true,
                    onSplit: (self) =>
                        gsap.from(self.words, {
                            yPercent: -120,
                            duration: 1,
                            ease: 'power4.out',
                            stagger: 0.08,
                            scrollTrigger: { trigger: titulo, start: inicio(0.9), once: true }
                        })
                });
            });
        } else {
            // Si SplitText no cargó, cae completo desde arriba
            entrada(
                titulos,
                { opacity: 0, y: -40 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 }
            );
        }

        // 2) Textos: suben con fade
        entrada(
            textos,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
        );

        // 3) Botones: rebote (sin transition mientras animan, para que no peleen con GSAP)
        entrada(
            botones,
            { opacity: 0, y: 20, scale: 0.85, transition: 'none' },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.12 }
        );

        // 4) Tarjetas: suben escalonadas
        entrada(
            tarjetas,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }
        );

        // 5) Imágenes y mapa: se revelan de arriba hacia abajo con zoom suave
        cajas.forEach((caja) => {
            const img = caja.querySelector('img');
            const esHero = caja.matches('.inicio-img');

            const tl = gsap.timeline({
                scrollTrigger: { trigger: caja, start: inicio(0.88), once: true },
                onComplete: () => {
                    if (esHero && img) flotar(img);
                }
            });

            tl.fromTo(
                caja,
                { clipPath: 'inset(0% 0% 100% 0% round 28px)' },
                {
                    clipPath: 'inset(0% 0% 0% 0% round 28px)',
                    duration: 1.3,
                    ease: 'power4.inOut',
                    clearProps: 'clipPath'
                }
            );

            if (img) {
                tl.from(img, { scale: 1.3, duration: 1.6, ease: 'power3.out', force3D: true }, 0);
            }
        });
    });

    // Con todo listo, se muestra la página: los elementos animados ya están ocultos por GSAP
    raiz.classList.remove('js-anim');

    // Por si alguna imagen más abajo termina de cargar después
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}