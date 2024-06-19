// https://forkify-api.herokuapp.com/v2

import * as model from './model.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultView from './views/resultView.js';
import searchView from './views/searchView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);
    // console.log(model.state.recipe);
    //we have to await because loadRacipe is an asyn function which will return a promise and we have to wait for that promise

    // Rendering the data
    recipeView.render(model.state.recipe);

    // bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const constrolSearchResult = async function () {
  try {
    resultView.renderSpinner();

    // fetching search query
    const query = searchView.getQuery();
    if (!query) return;

    // Loading search results
    await model.loadSearchReasults(query);

    // Rendering Search results
    // console.log(model.state.search.results);
    // resultView.render(model.state.search.results);

    // rendering only the required page (pagination)
    resultView.render(model.getSearchResultsPage(1));

    // Renderin initial pagination buttons
    paginationView.render(model.state.search);
  } catch (e) {
    console.log(e);
  }
};

const controlPagination = function (goToPage) {
  // console.log('page controller');

  // rendering the required page
  resultView.render(model.getSearchResultsPage(goToPage));

  // rendering New pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update new results
  model.updateServings(newServings);

  // renderin the recipe view again after making the changes
  // recipeView.render(model.state.recipe);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // updating recipte view
  recipeView.update(model.state.recipe);

  // Rendering bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);

  try {
    // showing loading spinner
    addRecipeView.renderSpinner();

    // uploading recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // rendering uploaded recipe view
    recipeView.render(model.state.recipe);

    // showind success message
    addRecipeView.renderMessage();

    // rendering the updated bookmark view | to add the recipe we just uploaded to the api
    bookmarkView.render(model.state.bookmarks);

    // changing the id in the url using window.history()

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(constrolSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
