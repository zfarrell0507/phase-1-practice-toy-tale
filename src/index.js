let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
// fetch commands
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => data.forEach(items => renderToy(items)))

const collection = document.querySelector('#toy-collection')
// functions from fetch

function renderToy(items) {
  const div = document.createElement('div');
    div.classList.add('card');
  const name = document.createElement('h2');
  const image = document.createElement('img');
    image.classList.add('toy-avatar');
  const likes = document.createElement('p');
  const btn = document.createElement('button');
    btn.classList.add('like-btn');
    btn.id = `${items.id}`;
    name.textContent = items.name;
    image.src = items.image;
    likes.textContent = `${items.likes} likes`;
    btn.textContent = `like`;
    //like.addEventListener('click', updateLike)
  div.appendChild(name);
  div.appendChild(image);
  div.appendChild(likes);
  div.appendChild(btn);
  collection.appendChild(div);
  console.log(collection);

  btn.addEventListener('click', e => updateLikeAmount(e));
}
const form = document.querySelector("form");
form.addEventListener('submit', handleForm);

function postToyCard(items) {
  return fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items)
  })
      .then(resp => resp.json())
}
function handleForm(e) {
  e.preventDefault();
  const toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  }
  postToyCard(toy)
  .then(renderToy);
  form.reset();
}

function updateLikeAmount(e){
  fetch(`http://localhost:3000/toys/${e.target.id}`,{
     method: "PATCH",
     headers: {
       "Content-Type" : "application/json",
        "Accept" : "application/json"
     },
     body: JSON.stringify({
       "likes": parseInt(e.target.previousElementSibling.innerText) + 1
     })
   })
   .then(res => res.json())
   .then(e.target.previousElementSibling.innerText = `${parseInt(e.target.previousElementSibling.innerText) + 1} likes`)
 } 

});
