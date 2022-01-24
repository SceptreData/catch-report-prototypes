const viewport = document.querySelector('#list-viewport')
const addFishBtn = document.querySelector('#add-fish')
const form = document.querySelector('#list-form')

const fish = []

function updateViewport() {
  viewport.innerHTML = ''
  let fishHTML = ''
  let combinedFish = combineFish(fish)

  for (const fish in combinedFish) {
    fishHTML += `
      <p>
        <span class="vp-species">${fish.toUpperCase()}</span> <span class="vp-quantity">${
      combinedFish[fish]
    }</span>
      </p>
    `
    viewport.innerHTML = fishHTML
  }
}

function combineFish() {
  let fishObj = {}
  fish.forEach(fish => {
    if (fishObj[fish.species]) {
      fishObj[fish.species] += Number(fish.quantity)
    } else {
      fishObj[fish.species] = Number(fish.quantity)
    }
  })
  console.log(fishObj)

  return fishObj
}

function addFish(e) {
  e.preventDefault()
  const formData = new FormData(form)
  const species = formData.get('list-fish')
  const quantity = formData.get('list-quantity')

  fish.push({ species, quantity })
  updateViewport()
}

addFishBtn.addEventListener('click', addFish)
