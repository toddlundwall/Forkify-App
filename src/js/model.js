// import { async } from 'regenerator-runtime';
import { API_URL, KEY } from './config.js';
import { AJAX } from './helpers.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    resultsPerPage: RES_PER_PAGE,
    query: '',
    results: [],
    page: 1,
  },
  bookmarks: [],
};
const createRecipeObject = data => {
  const { recipe } = data.data;
  return (state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  });
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(obj => {
    obj.quantity = (newServings * obj.quantity) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const loadSearchResults = async function (query) {
  state.search.page = 1;
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = state.search.resultsPerPage * (page - 1);
  const end = state.search.resultsPerPage * page;
  return state.search.results.slice(start, end);
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(bookmarks => bookmarks.id === id);
  state.bookmarks.splice(index, 1);
  // Mark current recipe as bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
clearBookmarks();
export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe);
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].includes('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingArr = ingredient[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3) throw new Error('Wrong ingredient format');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
