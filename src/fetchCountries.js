export {fetchCountries};

function fetchCountries(searchedCountry){
  const BASE_URL = 'https://restcountries.com/v3.1/name';

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