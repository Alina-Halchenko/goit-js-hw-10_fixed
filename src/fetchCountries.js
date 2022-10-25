export { BASE_URL, fetchCountries};

const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(searchedCountry){
  
  return fetch(`${BASE_URL}/${searchedCountry}?fields=name,capital,population,flags,languages`)
    .then(res => 
    { cleanMarkup();
      if (res.status === 404){
      Notiflix.Notify.failure('No matches found. Please enter correct name.')}
      else {
        return res.json()
      }
      })
    }