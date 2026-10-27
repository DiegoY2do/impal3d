import { renderFooter } from './components/footer.js';
import { renderAboutValues } from './components/aboutvalues.js';
import { renderNavbar } from './components/header.js';
import { renderAboutHero } from './components/abouthero.js';
import { renderStatics, initStatics } from './components/statistics.js';
import { renderTimeline } from './components/timeline.js';
import { renderTeam } from './components/team.js';
import { renderCompromiso } from './components/compromiso.js';
import { renderBrands } from './components/brands.js';
import { renderAboutBanner } from './components/aboutbanner.js';


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

const brands = document.querySelector('#brands');
brands.innerHTML = renderBrands();

const compromiso = document.querySelector('#compromiso');
compromiso.innerHTML = renderCompromiso();

const aboutbanner = document.querySelector('#aboutbanner');
aboutbanner.innerHTML = renderAboutBanner();

const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();
if (footer) {
    footer.innerHTML = renderFooter();
    
    renderFooter();
}   