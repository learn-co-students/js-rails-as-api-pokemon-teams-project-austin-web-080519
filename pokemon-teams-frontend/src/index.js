document.addEventListener('DOMContentLoaded', (event) => {
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    // const document.querySelector()
    
    // let displayPokemon = 

    function fetchTrainers() {
        return fetch(TRAINERS_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            displayTrainers(json)
        })
    };

    function displayTrainers(json) {
        
        json.forEach(trainer => {
            // trainer name displays here
            const main = document.querySelector('main');
            const newDiv = document.createElement('div'); 
            newDiv.classList.add("card");
            const newP = document.createElement('p');
            newP.innerText = `${trainer.name}`
            main.appendChild(newDiv)
            newDiv.appendChild(newP)
            //add button
            const addPokemonButton = document.createElement('button')
            addPokemonButton.setAttribute('data-trainer-id', `${trainer.id}`)
            addPokemonButton.innerText = `Add Pokemon`
            addPokemonButton.addEventListener("click", event => {
                fetch(POKEMONS_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                      }, 
                      body: JSON.stringify({
                          trainer_id: `${trainer.id}`
                          
                      })
                      
                })
            });

            newDiv.appendChild(addPokemonButton)
            // add Pokemon
                const list = document.createElement('ul')
                trainer.pokemons.forEach(pokemon => {
                const listItem = document.createElement('li')
                const addReleaseButton = document.createElement('button')
                addReleaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
                addReleaseButton.innerText = `Release`
                addReleaseButton.classList.add('release')
                listItem.innerText = `${pokemon.nickname} (${pokemon.species})`
                list.appendChild(listItem)
                newDiv.appendChild(list)
                listItem.appendChild(addReleaseButton)
            })
            
        
         })
        
    }

fetchTrainers()

});