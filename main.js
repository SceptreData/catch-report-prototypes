const viewport = document.querySelector('#list-viewport')
const addFishBtn = document.querySelector('#add-fish')
const form = document.querySelector('#list-form')
const error = document.querySelector('#error')

const fish = []

function updateViewport() {
  viewport.innerHTML = ''
  let fishHTML = ''
  let combinedFish = combineFish(fish)

  if (Object.keys(combinedFish).length) {
    viewport.classList.remove('empty')
  } else {
    viewport.classList.add('empty')
    viewport.innerHTML = 'Please add a fish...'
  }
  for (const fish in combinedFish) {
    fishHTML += `
      <p class="fish-entry">
        <span class="vp-species">${fish.toUpperCase()}</span> <span class="vp-quantity">${
      combinedFish[fish]
    }</span> <button class="delete-fish">X</button>
      </p>
    `
    viewport.innerHTML = fishHTML
  }

  const btns = document.querySelectorAll('.delete-fish')
  for (let btn of btns) {
    btn.addEventListener('click', removeFish)
  }
}

function combineFish() {
  let fishObj = {}
  fish.forEach(fish => {
    if (fish.quantity) {
      if (fishObj[fish.species]) {
        fishObj[fish.species] += Number(fish.quantity)
      } else {
        fishObj[fish.species] = Number(fish.quantity)
      }
    }
  })

  return fishObj
}

function resetSelections() {
  document.querySelector('#list-quantity').value = 0
  document.querySelector('#list-fish').selectedIndex = 0
}

function removeFish(e) {
  e.preventDefault()
  const parent = e.target.parentElement
  const fishName = parent.querySelector('.vp-species').innerText.toLowerCase()
  for (let fishSpecies of fish) {
    console.log(fishSpecies)
    if (fishSpecies.species == fishName) {
      fishSpecies.quantity = 0
    }
  }
  parent.remove()
  updateViewport()
}

function addFish(e) {
  e.preventDefault()
  error.innerText = ''
  const formData = new FormData(form)
  const species = formData.get('list-fish')
  const quantity = formData.get('list-quantity')

  if (quantity == 0) {
    error.innerText = 'Quantity must be higher than 0'
  }

  fish.push({ species, quantity })
  updateViewport()
  resetSelections()
}

addFishBtn.addEventListener('click', addFish)
