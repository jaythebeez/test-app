//
export const BASE_URL = 'https://mock-api.dev.lalamove.com';

 //all elements from dom are grabbed into this object
export const elements = {
  searchForm: document.querySelector('#map-search-form'),
  originInput: document.querySelector('input[name=origin]'),
  destInput: document.querySelector('input[name=destination]'),
  mapDiv: document.getElementById('map'),
  bodyDiv: document.querySelector('.body__container')
}