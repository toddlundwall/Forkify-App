import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      //   let page = this._data.page;
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      //   if (btn.document.querySelector.contains('btn--previous')) page--;
      //   handler(page);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // 1 page and other
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
      </svg>
   
        </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    // Other page
    if (numPages > curPage) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // 1 page only
    return '';
  }
}
// return `

//   <button class="btn--inline pagination__btn--prev">
//           <svg class="search__icon">
//             <use href="src/img/icons.svg#icon-arrow-left"></use>
//           </svg>
//           <span>Page 1</span>
//         </button>
//         <button class="btn--inline pagination__btn--next">
//           <span>Page 3</span>
//           <svg class="search__icon">
//             <use href="src/img/icons.svg#icon-arrow-right"></use>
//           </svg>
//         </button>`;
// }
export default new PaginationView();
