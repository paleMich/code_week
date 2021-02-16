
const listFrancia = document.querySelector('#section-fr')
const listItalia = document.querySelector('#section-it');
const listSpagna = document.querySelector('#section-es');
const listPortogallo = document.querySelector('#section-pt');
const listGrecia = document.querySelector('#section-gr');
const listGermania = document.querySelector('#section-de');


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
        show_in_popular: item.show_in_popular,
      }
    });

  } catch (error) {
      throw error
  }

  return state.cities;
}

function createCards(country, imgUrl, city, description, popular) {

  const cardCity = document.createElement('div');           // contenitore intera card 
  const cardImg = document.createElement('img');            // contenitore immagine
  const cardDetails = document.createElement('div');        // contenitore descrizione 


  const nameSection = document.createElement('h2');                    
  // const image = document.createElement('img');
  const nameCity = document.createElement('h3');
  const cardDescription = document.createElement('span');

  nameSection.textContent = country;
  cardImg.src = imgUrl;
  nameCity.textContent = city;
  cardDescription.textContent = description                 /* .substring(0, 350) */;

  // change style
  cardCity.classList.add('card__city');
  cardImg.classList.add('card__city--img');
  cardDetails.classList.add('card__city--description');

  // append all node
  // cardImg.appendChild(image);
  cardDetails.append(nameCity, cardDescription);
  
  cardCity.append(cardImg, cardDetails);

  // countrySection.appendChild(nameSection);

  showInPopular(cardCity, popular);

  return cardCity;
}

function showInPopular(card, popularCity){
  if (popularCity) {
    card.classList.add('border-gold');
  }
}

async function renderCards(country, list, node) {
  //filter per le country
  const result = await list.filter((data) => data.country === country)     //'Francia' || 'Italia' || 'Spagna' || 'Portogallo' || 'Grecia' || 'Germania'
  
  result.forEach((data) => {
    const card = createCards(data.country, data.img, data.name_city, data.content, data.show_in_popular);
    
    node.appendChild(card);
  }); 
}

function runHtmlOver() {
  getDataMapped()
  .then(() => {
      // console.log('new array mapped', state.cities)
      renderCards('Francia', state.cities, listFrancia);        
      renderCards('Italia', state.cities, listItalia);        
      renderCards('Spagna', state.cities, listSpagna);        
      renderCards('Portogallo', state.cities, listPortogallo);        
      renderCards('Grecia', state.cities, listGrecia);        
      renderCards('Germania', state.cities, listGermania);        
    })
}


document.addEventListener('DOMContentLoaded', runHtmlOver)