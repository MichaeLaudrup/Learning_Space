import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //prettier-ignore
    if (currentPage === 1 && numPages > 1) return `${this._nextButton()}` ;
    //prettier-ignore
    if (currentPage === numPages && numPages > 1) return `${this._previousButton()}`;
    if (currentPage < numPages)
      return `${this._previousButton()} ${this._nextButton()}`;
    return '';
  }
  _previousButton() {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto="${
      this._data.page - 1
    }">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
    </button>`;
  }

  _nextButton() {
    //prettier-ignore
    //prettier-ignore
    return `
    <button class="btn--inline pagination__btn--next" data-goto="${
      this._data.page + 1
    }">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
  }
}

export default new PaginationView();
