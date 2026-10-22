export function renderStatics(){
    return `
        <section class="statics-container">
            <div class="container-max">
                <div class="statistics-cards">
                    <div class="statistics-card">
                        <p class="number-statistics">+ <span class="counter" data-target="12000">0</span></p>
                        <p>Piezas impresas</p>
                    </div>
                    <div class="statistics-card">
                        <p class="number-statistics">+ <span class="counter" data-target="4800">0</span></p>
                        <p>Clientes satisfechos</p>
                    </div>
                    <div class="statistics-card">
                        <p class="number-statistics">+ <span class="counter" data-target="10">0</span></p>
                        <p>Impresoras</p>
                    </div>
                    <div class="statistics-card">
                        <p class="number-statistics"><span class="counter" data-target="4.95" data-decimals="2">0</span> / <span>5</span></p>
                        <p>Calificación promedio</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function animateCounter(el) {
    const target = Number(el.dataset.target);
    const decimals = Number(el.dataset.decimals || 0);
    const duration = 2000;
    const startTime = performance.now();

    const format = (value) =>
        value.toLocaleString('es-MX', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(eased * target);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = format(target);
        }
    }

    requestAnimationFrame(update);
}

export function initStatics() {
    const counters = document.querySelectorAll('.statistics-card .counter');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}