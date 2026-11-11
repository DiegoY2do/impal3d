import { renderNavbar } from './components/header.js';

const header = document.querySelector('#header');
if (header) header.innerHTML = renderNavbar();

const vistas = document.querySelectorAll('.cuenta-panel');

document.querySelectorAll('a[href^="#vista-"]').forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
        evento.preventDefault();

        const destino = enlace.getAttribute('href').slice(1);
        const vistaElegida = document.getElementById(destino);

        if (!vistaElegida) return;

        vistas.forEach((vista) => {
            vista.hidden = vista !== vistaElegida;
        });

        history.replaceState(null, '', `#${destino}`);
    });
});
// Esta pantalla es visual por ahora. El backend conectará los formularios después.
