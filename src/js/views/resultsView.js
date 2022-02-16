import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  //   _data;
  _errorMessage = `You're a fucking moron`;
  _message = '';

  _generateMarkup() {
    return `${this._data
      .map(recipe => previewView.render(recipe, false))
      .join('')}`;
  }
}
export default new ResultsView();
