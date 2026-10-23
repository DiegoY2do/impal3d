import {renderCompromiso } from './components/compromiso.js';

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

const timeline = document.querySelector('#timeline');
timeline.innerHTML = renderTimeline();

const brands = document.querySelector("#brands");
brands.innerHTML = renderBrands();

const compromiso = document.querySelector('#compromiso');
compromiso.innerHTML = renderCompromiso();

const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();