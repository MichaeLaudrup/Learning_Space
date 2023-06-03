import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    const result = this._data;
    return `
    <li class="preview">
        <a class="preview__link ${
          id === result.id ? 'preview__link--active' : ''
        } " href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated ${
              this._data.key ? '' : 'hidden'
            }">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
            
        </div>
        </a>
    </li>`;
  }
}

export default new PreviewView();
