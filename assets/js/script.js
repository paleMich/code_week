
const listFrancia = document.querySelector('#section-fr')
const listItalia = document.querySelector('#section-it');
const listSpagna = document.querySelector('#section-es');
const listPortogallo = document.querySelector('#section-pt');
const listGrecia = document.querySelector('#section-gr');
const listGermania = document.querySelector('#section-de');

const inputFr = document.querySelector('#search-fr');
const inputIt = document.querySelector('#search-it');
const inputEs = document.querySelector('#search-es');
const inputPt = document.querySelector('#search-pt');
const inputGr = document.querySelector('#search-gr');
const inputDe = document.querySelector('#search-de');
const ul = document.querySelector('.searchCity__list');
const noResults = document.querySelector('.no-results')

const state = {
  config: {
    endpoint: "https://api.musement.com/api/v3/cities"
  },
  cities: null
}

// mi prendo solo i dati mappati
const getDataMapped = async () => {

  try {
    const response = await fetch(state.config.endpoint);

    const json = await response.json();

    state.cities = json.map((item) => {
      
      return{
        country: item.country.name,
        img: item.cover_image_url,
        name_city: item.name,
        content: item.content,
        weight: item.weight,
        show_in_popular: item.show_in_popular,
      }
    });

  } catch (error) {
      throw error
  }

  return state.cities;
}

function createCards(city) { // country, imgUrl, city, description, popular, weight

  const cardCity = document.createElement('li');           // contenitore intera card 
  const cardImg = document.createElement('img');            // contenitore immagine
  const cardDetails = document.createElement('div');        // contenitore descrizione 
  const starWrapper = document.createElement('ul');
                   
  // const image = document.createElement('img');
  const nameCity = document.createElement('h3');
  const cardDescription = document.createElement('span');

  cardImg.src = city.img;
  nameCity.textContent = city.name_city;  
  cardDescription.textContent = city.content;                  /* .substring(0, 350) */;

  // change style
  cardCity.classList.add('card__city');
  cardImg.classList.add('card__city--img');
  cardDetails.classList.add('card__city--description');
  starWrapper.classList.add('star-wrapper', 'display-flex-row');

  // append all node
  // cardImg.appendChild(image);
  cardDetails.append(nameCity, cardDescription, starWrapper);
  
  cardCity.append(cardImg, cardDetails);

  showInPopular(cardCity, city.show_in_popular);
  showRating(city.weight, starWrapper);

  return cardCity;
}

// sezione input
function renderCities(list, node, select) {
  node.innerHTML = "";

  list.forEach((data) => {
    if (data.country === select.name) {                 /* .includes(arrMap) */
      
      const card = createCards(data)
  
      node.appendChild(card)
    }
  });
  
  if (list.length) {
    node.classList.remove("no-results--is-visible");
  } else {
    const divNoResults = document.createElement('div')
    const sorry = document.createElement('h3');
    const different = document.createElement('p');
  
    sorry.textContent = 'Sorry, no city found in this country.';
    different.textContent = 'Try with a different search.';
  
    divNoResults.append(sorry, different)
  
    node.appendChild(divNoResults)
    node.classList.add("no-results--is-visible");
  }
}

function countryMap(list, country) {
  const arr = country;

  const node = list.filter((data) => data.country.includes(arr));
  
  return node;
}

function searchBarFr(evt) {
  const arr = state.cities;

  const text = evt.target.value.toLowerCase();

  const list = arr.filter((data) => data.name_city.toLowerCase().includes(text));

  const arrMap = countryMap(list, 'Francia')

  renderCities(arrMap, listFrancia, inputFr);
}

function searchBarIt(evt) {
  const arr = state.cities;

  const text = evt.target.value.toLowerCase();

  const list = arr.filter((data) => data.name_city.toLowerCase().includes(text));

  const arrMap = countryMap(list, 'Italia')

  renderCities(arrMap, listItalia, inputIt);
}

function searchBarEs(evt) {
  const arr = state.cities;

  const text = evt.target.value.toLowerCase();

  const list = arr.filter((data) => data.name_city.toLowerCase().includes(text));

  const arrMap = countryMap(list, 'Spagna')

  renderCities(arrMap, listSpagna, inputEs);
}

function searchBarPt(evt) {
  const arr = state.cities;

  const text = evt.target.value.toLowerCase();

  const list = arr.filter((data) => data.name_city.toLowerCase().includes(text));

  const arrMap = countryMap(list, 'Portogallo')

  renderCities(arrMap, listPortogallo, inputPt);
}

function searchBarGr(evt) {
  const arr = state.cities;

  const text = evt.target.value.toLowerCase();

  const list = arr.filter((data) => data.name_city.toLowerCase().includes(text));

  const arrMap = countryMap(list, 'Grecia')

  renderCities(arrMap, listGrecia, inputGr);
}

function searchBarDe(evt) {
  const arr = state.cities;

  const text = evt.target.value.toLowerCase();

  const list = arr.filter((data) => data.name_city.toLowerCase().includes(text));

  const arrMap = countryMap(list, 'Germania')

  renderCities(arrMap, listGermania, inputDe);
}
// end sezione input

function showInPopular(card, popularCity){
  if (popularCity) {
    card.classList.add('border-gold');
  }
}

function showRating(weight, node){
  let wholeStars = Math.floor(weight);
  // console.log(wholeStars); 

  if (wholeStars >= 10) {
    for (let i = 0; i < 4; i++) {
      const newStar = document.createElement('i');
      newStar.classList.add('fa', 'fa-star', 'star-color');
      node.append(newStar);
    }
    for (let i = 0; i < 1; i++) {
      const halfStar = document.createElement('i');
      halfStar.classList.add('fa', 'fa-star', 'star_half-color');
      node.append(halfStar);
    }
  }
  
  // switch(weight){
  //   case weight >= 16:
  //     console.log('16');
  //     break;
  //   case weight >= 12:
  //     console.log('12');
  //     break;  
  //   case weight >= 8:
  //     console.log('8');
  //     break;  
  //   case weight >= 4:
  //     console.log('4');
  //     break;    
  //   default:
  //     console.log("Errore"); 
  // }
}

function renderCards(country, node) {
  //filter per le country
  const result = state.cities.filter((data) => data.country === country)    
  
  result.forEach((data) => {
    const card = createCards(data);      
    
    node.appendChild(card);
  }); 
}

function runHtmlOver() {
  getDataMapped()
  .then(() => {
      // console.log('new array mapped', state.cities)
      renderCards('Francia', listFrancia);        
      renderCards('Italia', listItalia);        
      renderCards('Spagna', listSpagna);        
      renderCards('Portogallo', listPortogallo);        
      renderCards('Grecia', listGrecia);        
      renderCards('Germania', listGermania);        
    })
  }
  
// let typingTimer;
// inputFr.addEventListener("input", () => {         /* passa evt alla funzione */
//   clearTimeout();
//   if (inputFr.value) {
//     typingTimer = setTimeout(searchBar(), 2500);
//   }
// });

inputFr.addEventListener("input", searchBarFr);
inputIt.addEventListener("input", searchBarIt);
inputEs.addEventListener("input", searchBarEs); 
inputPt.addEventListener("input", searchBarPt); 
inputGr.addEventListener("input", searchBarGr); 
inputDe.addEventListener("input", searchBarDe); 
// inputIt.addEventListener("input", searchBar);

document.addEventListener('DOMContentLoaded', runHtmlOver);