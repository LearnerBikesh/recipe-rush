import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(btn);
      console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // page 1 and other page
    if (this._data.page === 1 && numPages > 1) {
      return `
                <button data-goto = "${
                  this._data.page + 1
                }" class="btn--inline pagination__btn--next">
                    <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
    }

    // last page
    if (this._data.page === numPages && numPages > 1) {
      return `
                <button data-goto = "${
                  this._data.page - 1
                }" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this._data.page - 1}</span>
                </button>
            `;
    }

    // other pages
    if (this._data.page !== 1 && this._data.page < numPages) {
      return `
                <button data-goto = "${
                  this._data.page - 1
                }" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this._data.page - 1}</span>
                </button>
                <button data-goto = "${
                  this._data.page + 1
                }" class="btn--inline pagination__btn--next">
                    <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            
            `;
    }

    // only page 1
    return '';
  }
}

export default new PaginationView();
