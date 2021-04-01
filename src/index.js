const toyCollection = document.getElementById("toy-collection")
const toyForm = document.querySelector(".add-toy-form")
const toyInputs = document.querySelectorAll(".input-text")

collectToys()

function collectToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {data.forEach(toy => addToyToDom(toy))})
}

function addToyToDom(toy) {
  const divCard = document.createElement('div')
  divCard.classList.add('card')
  divCard.innerHTML = `<h2>${toy.name}</h2><img class="toy-avatar" src=${toy.image}><p>${toy.likes}</p><button id=${toy.id} class="like-btn">Like <3</button>`
  toyCollection.append(divCard)
  const likeBtn = document.getElementById(toy.id)
  likeBtn.addEventListener('click', increaseLikes)
}

// function findToy(event){
//   const toyId = event.target.id
//   fetch(`http://localhost:3000/toys/${toyId}`)
//   .then(resp => resp.json())
//   .then(toy => increaseLikes(toy))
// }


function increaseLikes(e) {
  // ++toy.likes
  let likes = e.target.parentElement.querySelector('p').innerText
  ++likes
  const id = e.target.id

  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  })

  e.target.parentElement.querySelector('p').innerText = likes
  // toyCollection.innerHTML = ""
  // collectToys()
}

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
});

toyForm.addEventListener('submit', createToy)

function createToy(event) {
  event.preventDefault()
  const toyName = toyInputs[0].value 
  const toyImageURL = toyInputs[1].value
  const addBtn = document.querySelector("#new-toy-btn")
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toyName,
      "image": toyImageURL,
      "likes": 0
    })
  })
  .then(resp = resp.json())
  .then(data => addToyToDom(data))

  toyInputs[0].value = ""
  toyInputs[1].value = ""
  addBtn.click()
  // toyCollection.innerHTML = ""
  // collectToys()
}