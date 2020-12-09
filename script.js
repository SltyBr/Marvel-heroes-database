document.addEventListener('DOMContentLoaded', ()=>{
'use strict';


const photo = document.querySelector('.photo');
const genderOptions = [];
const statusOptions = [];
const apiUrl = './dbHeroes.json';

/* async function getHeroes(){
  const response = await fetch(apiUrl);
  const data = await response.json();
}
getHeroes(); */

 
fetch(apiUrl)
    .then(response => response.json())
    .then(data => practice(data));

function practice(response){

  response.forEach(({realName, gender, status, photo})=>{

    genderOptions.push(gender);
    statusOptions.push(status);

    let optionName = document.createElement('option');
    optionName.textContent = realName;
    optionName.value = realName;
    document.querySelector('#selectNameId').append(optionName);

    const card =`
      <div class="card" attrName="${realName}" attrGender="${gender}" attrStatus="${status}">
        <div class="card-img">
          <img src="${photo}" alt="">
        </div>
        <div class="hero-name">
          ${realName}
        </div>
        <div class="hero-sex">
          ${gender}
        </div>
        <div class="hero-status">
          ${status}
        </div>
      </div>
    `;

    document.querySelector('.header').insertAdjacentHTML("beforeEnd", card);
  });

  let setGender = new Set(genderOptions),
      setCharStatus = new Set(statusOptions);

  let noItems = document.createElement('div');
      noItems.textContent = 'Cовпадений не найдено';

  const addOptions = (set, id)=>{
    set.forEach((item)=>{
      let option = document.createElement('option');
      option.textContent = item;
      option.value = item;
      document.querySelector(`${id}`).append(option);
    });
  };

  addOptions(setGender, '#selectGenderId');
  addOptions(setCharStatus, '#selectStatusId');

  let cards = document.querySelectorAll('.card');

  document.querySelector('#inputName').addEventListener('input', ()=>{
    let val = document.querySelector('#inputName').value.toLowerCase().trim();
    if(val !=''){
      cards.forEach((item)=>{
        if(item.textContent.toLowerCase().search(val) == -1){
          item.classList.add('hide');
        }
        else{
          item.classList.remove('hide');
          console.log(item.textContent);
        }
      });
    } else if(val == ''){
      cards.forEach((item)=>{
        item.classList.remove('hide');
      });
    }
  });

  document.querySelector('#main').addEventListener('change', (event)=>{
    let target = event.target;
    if(target.matches('#selectNameId')){
      document.querySelector('#main').setAttribute('attrName', `${target.value}`);
      if(document.querySelector('#main').attributes.attrname.value === 'all'){
        document.querySelector('#main').removeAttribute('attrName');
      }
    }
    if(target.matches('#selectGenderId')){
      document.querySelector('#main').setAttribute('attrGender', `${target.value}`);
      if(document.querySelector('#main').attributes.attrgender.value === 'all'){
        document.querySelector('#main').removeAttribute('attrGender');
      }
    }
    if(target.matches('#selectStatusId')){
      document.querySelector('#main').setAttribute('attrStatus', `${target.value}`);
      if(document.querySelector('#main').attributes.attrstatus.value === 'all'){
        document.querySelector('#main').removeAttribute('attrStatus');
      }
    }

    cards.forEach((item)=>{
      if(document.querySelectorAll('.hide').length == cards.length){
        document.querySelector('.header').append(noItems);
      }
      else{
        noItems.remove();
      }
      if(document.querySelector('#main').attributes.attrname){
        if(item.attributes.attrname.value !== document.querySelector('#main').attributes.attrname.value){
        item.classList.add('hide');
      } else{
        item.classList.remove('hide');
      }
    } else{
      item.classList.remove('hide');
    }
    if(document.querySelector('#main').attributes.attrgender){ 
      if(item.attributes.attrgender.value !== document.querySelector('#main').attributes.attrgender.value){
        item.classList.add('hide');
      }else{
        item.classList.remove('hide');
      }
    }
    if(document.querySelector('#main').attributes.attrstatus){ 
      if(item.attributes.attrstatus.value !== document.querySelector('#main').attributes.attrstatus.value){
        item.classList.add('hide');
      }else{
        item.classList.remove('hide');
      }
    }
    if(document.querySelector('#main').attributes.attrgender && document.querySelector('#main').attributes.attrstatus){
      if(item.attributes.attrstatus.value == document.querySelector('#main').attributes.attrstatus.value &&
      item.attributes.attrgender.value == document.querySelector('#main').attributes.attrgender.value){
        item.classList.remove('hide');
      }else{
        item.classList.add('hide');
      }
    }
    if(document.querySelector('#main').attributes.attrname && document.querySelector('#main').attributes.attrstatus){
      if(item.attributes.attrstatus.value == document.querySelector('#main').attributes.attrstatus.value &&
      item.attributes.attrname.value == document.querySelector('#main').attributes.attrname.value){
        item.classList.remove('hide');
      }else{
        item.classList.add('hide');
      }
    }
    if(document.querySelector('#main').attributes.attrname && document.querySelector('#main').attributes.attrgender){
      if(item.attributes.attrgender.value == document.querySelector('#main').attributes.attrgender.value &&
      item.attributes.attrname.value == document.querySelector('#main').attributes.attrname.value){
        item.classList.remove('hide');
      }else{
        item.classList.add('hide');
      }
    }
    if(document.querySelector('#main').attributes.attrgender && 
    document.querySelector('#main').attributes.attrstatus && 
    document.querySelector('#main').attributes.attrname){
      if(item.attributes.attrstatus.value == document.querySelector('#main').attributes.attrstatus.value &&
      item.attributes.attrgender.value == document.querySelector('#main').attributes.attrgender.value &&
      item.attributes.attrname.value == document.querySelector('#main').attributes.attrname.value){
        item.classList.remove('hide');
      }else{
        item.classList.add('hide');
      }
    }
  });
  });
}
});