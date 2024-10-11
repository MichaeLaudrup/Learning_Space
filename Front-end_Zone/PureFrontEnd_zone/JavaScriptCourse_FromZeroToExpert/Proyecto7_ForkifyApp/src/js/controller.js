import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2
const controlServings = function (numServings = model.state.recipe.servings) {
  model.updateServings(numServings);
  recipeView.update(model.state.recipe);
};

const controlRecipes = async function () {
  //prettier-ignore
  try {
    const id = window.location.hash.slice(1); 
    if (!id) return; 
    //1) loading recipe
    recipeView.renderSpinner(); 

    resultsView.update(model.getSearchResultsPage()); 
    bookmarkView.update(model.state.bookmarks); 
    await model.loadRecipe(id); 
    recipeView.render(model.state.recipe); 
    controlServings();
  } catch (err) {
    recipeView.renderError();
    console.error(err); 
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());

    //Renderizar botones iniciales
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  //Renderizar botones iniciales
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarkView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
