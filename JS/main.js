import { renderNavbar } from './components/header.js';
import { renderFooter } from './components/footer.js';



const header = document.querySelector('#header');
header.innerHTML = renderNavbar();


const footer = document.querySelector('#footer');
footer.innerHTML = renderFooter();
