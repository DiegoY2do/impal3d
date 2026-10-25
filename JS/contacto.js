import { renderPreguntasRapidas} from "./components/preguntasrapidas";

const preguntas = document.querySelector('#preguntas-rapidas');
preguntas.innerHTML = renderPreguntasRapidas();