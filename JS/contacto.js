import { renderPreguntasRapidas } from './components/preguntasrapidas.js';

const preguntas = document.querySelector('#preguntas-rapidas');
preguntas.innerHTML = renderPreguntasRapidas();