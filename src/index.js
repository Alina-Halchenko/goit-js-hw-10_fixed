import './css/styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from "notiflix";
import {fetchCountries} from './fetchCountries';
import debounce from 'lodash.debounce';

const refs = {
  formImput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'), 
}
const DEBOUNCE_DELAY = 300;
let countriesMarkup = '';
let singleCountryMarkup = '';

refs.formImput.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(evt){
  const searchedCountry = evt.target.value.trim();
  console.log(searchedCountry);


  if (searchedCountry === ''){
    cleanMarkup();
  }

  fetchCountries(searchedCountry).then(renderMarkups).catch(error => {
      if (!error.status === 404){ 
        return Notiflix.Notify.failure('No matches found. Please enter correct name.')}
    })
};

function createContListMarkup(countries){
  return countries
  .map(({flags, name}) => {
  return `
  <li>
      <img class="country-list_img" src="${flags.svg}" alt="flag" width="30"/>
      <p class="country-list_p">${name.common}</p>
    </li>
  `;
  })
  .join('');
}


function createSinCountMarkup(country){
  const {flags, name, population, capital} = country[0];

  const langs = Object.values(country[0].languages).join(', ');

  return `
  <div class="country-info__wrap">
    <img class="country-info__flag" src="${flags.svg}" alt="flag" width="60"/>
    <h1 class="country-info__name">${name.common}</h1>
  </div>
  <ul class="country-info__data">
    <li>
      <p class="country-info__p">Capital: <span>${capital}</span></p>
    </li>
    <li>
      <p class="country-info__p">Population: <span>${population}</span></p>
    </li>
    <li>
    <p class="country-info__p">Languages: <span>${langs}</span></p>
  </li>
  </ul>`
}


function cleanMarkup(){
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderMarkups(countries){
  if(countries.length > 10){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
  } else if (countries.length > 1) {
    countriesMarkup = createContListMarkup(countries);
    return refs.countryList.insertAdjacentHTML('beforeend', countriesMarkup)
  } else {
      singleCountryMarkup = createSinCountMarkup (countries);
      return refs.countryInfo.insertAdjacentHTML('beforeend', singleCountryMarkup)
    }
}