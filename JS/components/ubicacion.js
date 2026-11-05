export function renderUbicacion() {
    return `
        <section class="ubicacion" id="ubicacion">
            <div class="container-max">
                <div class="ubicacion-contenido">
                    <div class="ubicacion-texto">
                        <h2>Visítanos en nuestro taller</h2>
                        <p>Encuentra nuestra ubicación en el mapa.</p>
                    </div>

                    <div class="mapa-contenedor">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.3646873505704!2d-99.07849431749304!3d19.309975135385574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce03d4db6ecbb7%3A0x73f7764cb1255d68!2sUtop%C3%ADa%20Tezontli!5e0!3m2!1ses-419!2smx!4v1793024572534!5m2!1ses-419!2smx"
                            title="Ubicación de Impal3D en Google Maps"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="strict-origin-when-cross-origin">
                        </iframe>

                        <div class="mapa-tarjeta">
                            <h3>Taller IMP AI3D</h3>
                            <p>Utopía Tezontli, San AntonioUtopía Tezontli, San Antonio.<br> 
                            Iztapalapa, 09900 Ciudad de México, CDMX</p>
                            <a class="link-flecha" href="https://www.google.com/maps/dir/?api=1&destination=19.309975,-99.078494" target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}