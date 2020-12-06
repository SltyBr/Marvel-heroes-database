'use strict';

const photo = document.querySelector('.photo');

const apiUrl = './dbHeroes.json';

async function getHeroes(){
  const response = await fetch(apiUrl);
  const data = await response.json();

  data.forEach((item)=>{
    const option = document.createElement('option');
    option.innerText = item.name;
    document.querySelector('#select').insertAdjacentElement('beforeend', option);
  });
}
getHeroes();