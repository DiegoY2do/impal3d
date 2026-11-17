/** Aviso temporal abajo a la derecha. tipo: 'ok' | 'error' | 'aviso' */
export function toast(texto, tipo = 'ok') {
    const cont = document.getElementById('panel-toasts');
    if (!cont) return;
    const el = document.createElement('div');
    el.className = `pn-toast pn-toast--${tipo}`;
    el.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
    el.textContent = texto;
    cont.appendChild(el);
    while (cont.children.length > 3) cont.firstElementChild.remove();
    setTimeout(() => el.classList.add('is-out'), 4200);
    setTimeout(() => el.remove(), 4700);
}