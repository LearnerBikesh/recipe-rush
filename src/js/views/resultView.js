import View from './view';
import icons from '../../img/icons.svg';

class ResultViews extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query!!!';

  _generateMarkup() {
    // console.log(this._data.length);
    console.log(this._data.key);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
    <li class="preview">
        <a class="preview__link preview__link--active" href='#${result.id}'>
        <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
        </div>
        </a>
    </li>
    `;
  }
}

export default new ResultViews();
