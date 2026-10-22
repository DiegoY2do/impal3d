import { renderFooter } from './components/footer.js';
import { renderAboutValues } from './components/aboutvalues.js';
import { renderNavbar } from './components/header.js';
import { renderAboutHero } from './components/abouthero.js';
import { renderStatics, initStatics } from './components/statistics.js';
import { renderTimeline } from './components/timeline.js';
import {renderFooter } from './components/footer.js';

const header = document.querySelector('#header');
header.innerHTML = renderNavbar();

const abouthero = document.querySelector('#abouthero');
abouthero.innerHTML = renderAboutHero();

const statistics = document.querySelector('#statistics');
statistics.innerHTML = renderStatics();
initStatics();

const aboutvalues = document.querySelector('#aboutvalues');
aboutvalues.innerHTML = renderAboutValues();

const timeline = document.querySelector('#timeline');
timeline.innerHTML = renderTimeline();

const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();
