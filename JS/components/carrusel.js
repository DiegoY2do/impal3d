export function renderCarrusel() {
    return `
    <div id="carouselPeek" class="carousel slide" data-bs-ends="stop" style="--bs-carousel-items-peek: 3rem; --bs-carousel-items-gap: 1rem;">
  <div class="d-flex justify-content-between align-items-center">
    <h5 class="mb-0">Peek the neighbors</h5>
    <div>
      <button class="btn-icon btn-sm" type="button" data-bs-target="#carouselPeek" data-bs-slide="prev" style="--bs-carousel-control-icon-width: 1rem;">
        <span class="carousel-icon-prev" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="btn-icon btn-sm" type="button" data-bs-target="#carouselPeek" data-bs-slide="next" style="--bs-carousel-control-icon-width: 1rem;">
        <span class="carousel-icon-next" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active"><img src="..." class="d-block w-100 rounded-5" alt="..."></div>
    <div class="carousel-item"><img src="..." class="d-block w-100 rounded-5" alt="..."></div>
    <div class="carousel-item"><img src="..." class="d-block w-100 rounded-5" alt="..."></div>
    <div class="carousel-item"><img src="..." class="d-block w-100 rounded-5" alt="..."></div>
    <div class="carousel-item"><img src="..." class="d-block w-100 rounded-5" alt="..."></div>
  </div>
</div> `;
}