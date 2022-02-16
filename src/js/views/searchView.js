import View from './View.js';
import icons from 'url:../../img/icons.svg';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  //   #generateSearchResults() {
  //     return `          <li class="preview">
  //             <a class="preview__link preview__link--active" href="#23456">
  //               <figure class="preview__fig">
  //                 <img src="src/img/test-1.jpg" alt="Test" />
  //               </figure>
  //               <div class="preview__data">
  //                 <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
  //                 <p class="preview__publisher">The Pioneer Woman</p>
  //                 <div class="preview__user-generated">
  //                   <svg>
  //                     <use href="${icons}#icon-user"></use>
  //                   </svg>
  //                 </div>
  //               </div>
  //             </a>
  //           </li>`;
  //   }
}

export default new SearchView();
