document.addEventListener('DOMContentLoaded', ()=>{
'use strict';

const main = document.querySelector('#main'),
      header = document.querySelector('.header'),
      genderOptions = [],
      statusOptions = [],
      apiUrl = './dbHeroes.json';
      let movieOptions = [];
 
fetch(apiUrl)
    .then(response => response.json())
    .then(data => practice(data));

function practice(response){

  response.forEach(({realName, gender, status, photo, movies})=>{

    genderOptions.push(gender);
    statusOptions.push(status);
    movieOptions.push(movies);

    let optionName = document.createElement('option');
    optionName.textContent = realName;
    optionName.value = realName;
    document.querySelector('#selectNameId').append(optionName);

    const card =`
      <div class="card" attrName="${realName}" attrGender="${gender}" attrStatus="${status}" attrMovie="${movies}">
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

    header.insertAdjacentHTML("beforeEnd", card);
  });

  const setAttributes = (el, attrs)=>{
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };

  setAttributes(main, {"attrName":"", "attrGender":"", "attrStatus":"", "attrMovie":""});

  movieOptions = movieOptions.reduce((initial, elem)=>{
    return initial.concat(elem);
  }, []);

  movieOptions = movieOptions.filter((item)=>{
    return item !== undefined;
  });

  let setGender = new Set(genderOptions),
      setCharStatus = new Set(statusOptions),
      setMovieOptions = new Set(movieOptions);

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
  addOptions(setMovieOptions, '#selectMovieId');

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
        }
      });
    } else if(val == ''){
      cards.forEach((item)=>{
        item.classList.remove('hide');
      });
    }
  });

  main.addEventListener('change', (event)=>{
    let target = event.target;
    document.querySelector('#inputName').value = '';
    
    if(target.matches('#selectNameId')){
      main.setAttribute('attrName', `${target.value}`);
      if(main.attributes.attrname.value === 'all'){
        main.removeAttribute('attrName');
      }
    }
    if(target.matches('#selectGenderId')){
      main.setAttribute('attrGender', `${target.value}`);
      if(main.attributes.attrgender.value === 'all'){
        main.removeAttribute('attrGender');
      }
    }
    if(target.matches('#selectStatusId')){
      main.setAttribute('attrStatus', `${target.value}`);
      if(main.attributes.attrstatus.value === 'all'){
        main.removeAttribute('attrStatus');
      }
    }
    if(target.matches('#selectMovieId')){
      main.setAttribute('attrMovie', `${target.value}`);
      if(main.attributes.attrmovie.value === 'all'){
        main.removeAttribute('attrMovie');
      }
    }

    cards.forEach((item)=>{
      if(document.querySelectorAll('.hide').length == cards.length){
        header.append(noItems);
      }
      else{
        noItems.remove();
      }
      if(main.attributes.attrname){
        if(item.attributes.attrname.value !== main.attributes.attrname.value){
        item.classList.add('hide');
      } else{
        item.classList.remove('hide');
      }
    } else{
      item.classList.remove('hide');
    }
    if(main.attributes.attrgender){ 
      if(item.attributes.attrgender.value !== main.attributes.attrgender.value){
        item.classList.add('hide');
      }else{
        item.classList.remove('hide');
      }
    }
    if(main.attributes.attrstatus){ 
      if(item.attributes.attrstatus.value !== main.attributes.attrstatus.value){
        item.classList.add('hide');
      }else{
        item.classList.remove('hide');
      }
    }
    if(main.attributes.attrmovie){
      if(item.attributes.attrmovie.value.search(main.attributes.attrmovie.value) == -1){
        item.classList.add('hide');
      }
      else{
        item.classList.remove('hide');
      }
    }
    if(main.attributes.attrgender && main.attributes.attrstatus){
      if(item.attributes.attrstatus.value == main.attributes.attrstatus.value &&
      item.attributes.attrgender.value == main.attributes.attrgender.value){
        item.classList.remove('hide');
      }else{
        item.classList.add('hide');
      }
    }
    if(main.attributes.attrname && main.attributes.attrstatus){
      if(item.attributes.attrstatus.value == main.attributes.attrstatus.value &&
      item.attributes.attrname.value == main.attributes.attrname.value){
        item.classList.remove('hide');
      }else{
        item.classList.add('hide');
      }
    }
    if(main.attributes.attrname && main.attributes.attrgender){
      if(item.attributes.attrgender.value == main.attributes.attrgender.value &&
      item.attributes.attrname.value == main.attributes.attrname.value){
        item.classList.remove('hide');
      }else{
        item.classList.add('hide');
      }
    }
    if(main.attributes.attrgender && 
    main.attributes.attrstatus && 
    main.attributes.attrname){
      if(item.attributes.attrstatus.value == main.attributes.attrstatus.value &&
      item.attributes.attrgender.value == main.attributes.attrgender.value &&
      item.attributes.attrname.value == main.attributes.attrname.value){
        item.classList.remove('hide');
      }else{
        item.classList.add('hide');
      }
    }
  });
  });
}
});