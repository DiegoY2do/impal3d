import { renderFooter } from './components/footer.js';
import { renderAboutValues } from './components/aboutvalues.js';
import { renderNavbar } from './components/header.js';
import { renderAboutHero } from './components/abouthero.js';
import { renderStatics, initStatics } from './components/statistics.js';
<<<<<<< Updated upstream
import { renderTimeline } from './components/timeline.js';
import { renderTeam } from './components/team.js';
=======
import {renderFooter } from './components/footer.js';
import {renderCompromiso } from './components/compromiso.js';
>>>>>>> Stashed changes

const header = document.querySelector('#header');
header.innerHTML = renderNavbar();

const abouthero = document.querySelector('#abouthero');
abouthero.innerHTML = renderAboutHero();

const statistics = document.querySelector('#statistics');
statistics.innerHTML = renderStatics();
initStatics();

const team = document.querySelector('#team');
team.innerHTML = renderTeam();
const aboutvalues = document.querySelector('#aboutvalues');
aboutvalues.innerHTML = renderAboutValues();

<<<<<<< Updated upstream
const timeline = document.querySelector('#timeline');
timeline.innerHTML = renderTimeline();

const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();
=======

const compromiso = document.querySelector('#compromiso');
compromiso.innerHTML = renderCompromiso();
>>>>>>> Stashed changes
