const viewport = document.querySelector('#list-viewport');
const addFishBtn = document.querySelector('#add-fish');
const form = document.querySelector('#list-form');
const fish = [];
function updateViewport() {
    viewport.innerHTML = '';
    let fishHTML = '';
    let combinedFish = combineFish(fish);
    for(const fish1 in combinedFish){
        fishHTML += `
      <p>
        <span class="vp-species">${fish1.toUpperCase()}</span> <span class="vp-quantity">${combinedFish[fish1]}</span>
      </p>
    `;
        viewport.innerHTML = fishHTML;
    }
}
function combineFish() {
    let fishObj = {
    };
    fish.forEach((fish2)=>{
        if (fishObj[fish2.species]) fishObj[fish2.species] += Number(fish2.quantity);
        else fishObj[fish2.species] = Number(fish2.quantity);
    });
    console.log(fishObj);
    return fishObj;
}
function addFish(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const species = formData.get('list-fish');
    const quantity = formData.get('list-quantity');
    fish.push({
        species,
        quantity
    });
    updateViewport();
}
addFishBtn.addEventListener('click', addFish);

//# sourceMappingURL=index.c4775257.js.map
