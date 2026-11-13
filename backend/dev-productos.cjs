
const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_FILE = path.join(ROOT, 'data', 'productos.json');
const IMG_DIR = path.join(ROOT, 'assets', 'img', 'productos');
const IMG_RUTA = './assets/img/productos/';
const PORT = Number(process.env.PORT) || 4000;
const MAX_JSON = 200 * 1024;
const MAX_IMG = 10 * 1024 * 1024;

const MIME = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
    '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8'
};

class ErrorHttp extends Error {
    constructor(status, mensaje) {
        super(mensaje);
        this.status = status;
    }
}

// ---------- Formato idéntico al de productos.json ----------
function serializar(lista) {
    const json = JSON.stringify(lista, (k, v) => {
        if (k === 'rating' && typeof v === 'number') {
            const d = Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? v.toFixed(1) : String(v);
            return `__R${d}__`;
        }
        return v;
    }, 4);
    return json.replace(/"__R([\d.]+)__"/g, '$1') + '\n';
}

// ---------- Validación y armado del producto (orden de claves del catálogo) ----------
const texto = (v) => typeof v === 'string' && v.trim() !== '';
const exigir = (cond, mensaje) => { if (!cond) throw new ErrorHttp(400, mensaje); };

function armarProducto(b, id) {
    exigir(b && typeof b === 'object', 'Cuerpo inválido.');
    exigir(texto(b.nombre), 'El nombre es obligatorio.');
    exigir(texto(b.categoria), 'La categoría es obligatoria.');
    exigir(Array.isArray(b.colecciones) && b.colecciones.every(texto), 'Colecciones inválidas.');
    exigir(typeof b.precio === 'number' && b.precio > 0, 'El precio debe ser mayor a 0.');
    exigir(typeof b.rating === 'number' && b.rating >= 0 && b.rating <= 5, 'El rating debe estar entre 0 y 5.');
    exigir(Number.isInteger(b.resenas) && b.resenas >= 0, 'Las reseñas deben ser un entero de 0 en adelante.');
    exigir(texto(b.descripcion), 'La descripción es obligatoria.');
    exigir(texto(b['tamaño']), 'El tamaño es obligatorio.');
    exigir(Array.isArray(b.imagenes) && b.imagenes.length > 0 && b.imagenes.every(texto), 'Agrega al menos una imagen.');
    exigir(b.desc === undefined || (Number.isInteger(b.desc) && b.desc >= 1 && b.desc <= 99), 'El descuento debe estar entre 1 y 99.');
    exigir(!b.colecciones.includes('ofertas') || b.desc !== undefined, 'Si está en "ofertas" necesita descuento.');

    const p = {
        id,
        nombre: b.nombre.trim(),
        colecciones: [...new Set(b.colecciones.map(c => c.trim()))],
        categoria: b.categoria.trim(),
        precio: b.precio,
        rating: b.rating,
        resenas: b.resenas
    };
    if (b.agotado === true) p.agotado = true;
    if (b.nuevo === true) p.nuevo = true;
    if (b.desc !== undefined) p.desc = b.desc;
    p.descripcion = b.descripcion.trim();
    p['tamaño'] = b['tamaño'].trim();
    p.imagenes = b.imagenes.map(i => i.trim());
    return p;
}

// ---------- Lectura / escritura del JSON (en cola para que no se pisen) ----------
async function leerLista() {
    let crudo;
    try { crudo = await fs.readFile(JSON_FILE, 'utf-8'); }
    catch (e) { throw new ErrorHttp(500, 'No encuentro data/productos.json.'); }
    let lista;
    try { lista = JSON.parse(crudo); }
    catch { throw new ErrorHttp(500, 'data/productos.json no es un JSON válido.'); }
    if (!Array.isArray(lista)) throw new ErrorHttp(500, 'data/productos.json debe ser un arreglo.');
    return lista;
}

async function escribirLista(lista) {
    const tmp = JSON_FILE + '.tmp';
    await fs.writeFile(tmp, serializar(lista), 'utf-8');
    await fs.rename(tmp, JSON_FILE);
}

let cola = Promise.resolve();
function enCola(tarea) {
    const t = cola.then(tarea);
    cola = t.catch(() => {});
    return t;
}

const siguienteId = (lista) => lista.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1;

const crear = (body) => enCola(async () => {
    const lista = await leerLista();
    const id = siguienteId(lista);
    lista.push(armarProducto(body, id));
    await escribirLista(lista);
    return { id, total: lista.length };
});

const editar = (id, body) => enCola(async () => {
    const lista = await leerLista();
    const i = lista.findIndex(p => p.id === id);
    if (i < 0) throw new ErrorHttp(404, 'Ese producto no existe.');
    lista[i] = armarProducto(body, id);
    await escribirLista(lista);
    return { id, total: lista.length };
});

const eliminar = (id) => enCola(async () => {
    const lista = await leerLista();
    const i = lista.findIndex(p => p.id === id);
    if (i < 0) throw new ErrorHttp(404, 'Ese producto no existe.');
    lista.splice(i, 1);
    await escribirLista(lista);
    return { id, total: lista.length };
});

// ---------- Imágenes (solo .webp reales, sin sobrescribir las existentes) ----------
function nombreBase(nombre) {
    const base = path.basename(String(nombre || 'imagen'))
        .replace(/\.[^.]*$/, '')
        .normalize('NFC')
        .replace(/[^\p{L}\p{N} ._-]/gu, '')
        .replace(/\s+/g, ' ')
        .replace(/^[. ]+|[. ]+$/g, '')
        .slice(0, 80);
    return base || 'imagen';
}

async function guardarImagen(nombre, buf) {
    const esWebp = buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP';
    if (!esWebp) throw new ErrorHttp(415, 'El archivo no es un WebP válido.');
    await fs.mkdir(IMG_DIR, { recursive: true });
    const base = nombreBase(nombre);
    for (let i = 0; i < 1000; i++) {
        const archivo = i === 0 ? `${base}.webp` : `${base}-${i}.webp`;
        try {
            await fs.writeFile(path.join(IMG_DIR, archivo), buf, { flag: 'wx' });
            return { ruta: IMG_RUTA + archivo };
        } catch (e) {
            if (e.code !== 'EEXIST') throw e;
        }
    }
    throw new ErrorHttp(409, 'No pude encontrar un nombre libre para la imagen.');
}

// ---------- HTTP ----------
function responder(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
}

function leerBody(req, limite) {
    return new Promise((resolve, reject) => {
        let size = 0;
        let excedido = false;
        const partes = [];
        req.on('data', (c) => {
            size += c.length;
            if (size > limite) { excedido = true; return; }
            partes.push(c);
        });
        req.on('end', () => (excedido
            ? reject(new ErrorHttp(413, 'El archivo es demasiado grande.'))
            : resolve(Buffer.concat(partes))));
        req.on('error', reject);
    });
}

function parseJson(buf) {
    try { return JSON.parse(buf.toString('utf-8')); }
    catch { throw new ErrorHttp(400, 'JSON inválido.'); }
}

async function api(req, res, url) {
    const { pathname } = url;
    let m;

    if (pathname === '/api/productos') {
        if (req.method !== 'POST') throw new ErrorHttp(405, 'Usa POST.');
        const r = await crear(parseJson(await leerBody(req, MAX_JSON)));
        console.log(`+ producto agregado (id ${r.id}, total ${r.total})`);
        return responder(res, 201, r);
    }

    if ((m = pathname.match(/^\/api\/productos\/(\d+)$/))) {
        const id = Number(m[1]);
        if (req.method === 'PUT') {
            const r = await editar(id, parseJson(await leerBody(req, MAX_JSON)));
            console.log(`~ producto ${id} actualizado`);
            return responder(res, 200, r);
        }
        if (req.method === 'DELETE') {
            const r = await eliminar(id);
            console.log(`- producto ${id} eliminado (total ${r.total})`);
            return responder(res, 200, r);
        }
        throw new ErrorHttp(405, 'Usa PUT o DELETE.');
    }

    if (pathname === '/api/imagenes') {
        if (req.method !== 'POST') throw new ErrorHttp(405, 'Usa POST.');
        const r = await guardarImagen(url.searchParams.get('nombre'), await leerBody(req, MAX_IMG));
        console.log(`+ imagen ${r.ruta}`);
        return responder(res, 201, r);
    }

    throw new ErrorHttp(404, 'Ruta de API desconocida.');
}

async function estatico(req, res, pathname) {
    let ruta;
    try { ruta = decodeURIComponent(pathname); }
    catch { throw new ErrorHttp(400, 'URL inválida.'); }
    if (ruta.endsWith('/')) ruta += 'index.html';

    const archivo = path.normalize(path.join(ROOT, ruta));
    const relativa = path.relative(ROOT, archivo);
    const partes = relativa.split(path.sep);
    // Nada fuera del proyecto, ni archivos ocultos (.env, .git), ni la carpeta backend
    if (relativa.startsWith('..') || path.isAbsolute(relativa) ||
        partes.some(s => s.startsWith('.')) || partes[0].toLowerCase() === 'backend') {
        throw new ErrorHttp(403, 'Prohibido.');
    }
    let datos;
    try { datos = await fs.readFile(archivo); }
    catch { throw new ErrorHttp(404, 'No encontrado.'); }
    res.writeHead(200, {
        'Content-Type': MIME[path.extname(archivo).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store'
    });
    res.end(req.method === 'HEAD' ? undefined : datos);
}

const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, 'http://x');
        if (url.pathname.startsWith('/api/')) return await api(req, res, url);
        if (req.method === 'GET' || req.method === 'HEAD') return await estatico(req, res, url.pathname);
        throw new ErrorHttp(405, 'Método no permitido.');
    } catch (err) {
        if (!(err instanceof ErrorHttp)) console.error(err);
        responder(res, err.status || 500, { error: err instanceof ErrorHttp ? err.message : 'Error interno del servidor.' });
    }
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor local: http://localhost:${PORT}/Panel.html`);
    console.log(`Guardando en:   ${JSON_FILE}`);
});
