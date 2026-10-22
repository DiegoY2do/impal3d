import { renderNavbar } from './components/header.js';
import { renderAboutHero } from './components/abouthero.js';
import { renderStatics, initStatics } from './components/statistics.js';
import { renderTeam } from './components/team.js';

const header = document.querySelector('#header');
header.innerHTML = renderNavbar();

const abouthero = document.querySelector('#abouthero');
abouthero.innerHTML = renderAboutHero();

const statistics = document.querySelector('#statistics');
statistics.innerHTML = renderStatics();
initStatics();

const team = document.querySelector('#team');
team.innerHTML = renderTeam();