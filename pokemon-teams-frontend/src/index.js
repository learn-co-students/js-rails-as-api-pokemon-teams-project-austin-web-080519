const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

function addPokemon(trainer) {
    let pokemonData = {
        trainer_id: trainer.id
    };

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonData)
    };

    console.log(configObj);
    fetch(POKEMONS_URL, configObj)
    .then( response => {
        return response.json()
    })
    .then( pokeData => {
        console.log(pokeData);
        const li = document.createElement("li");
        const ul = document.querySelector(`[trainer-list-id="${trainer.id}"]`)
        li.innerHTML = `${pokeData.nickname} (${pokeData.species})`
        li.setAttribute("pokemon-list-id", `${pokeData.id}`);
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "release");
        deleteButton.setAttribute("data-pokemon-id", `${pokeData.id}`);
        deleteButton.innerText = "Release";
        createBtnEventListener(deleteButton, pokeData);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    })
}

function releasePokemon(pokemon) {

    let pokemonData = {
        id: pokemon.id,
        nickname: pokemon.nickname,
        species: pokemon.species,
        trainer_id: pokemon.trainer_id
    }

    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pokemonData)
    }

    fetch(`${POKEMONS_URL}/${pokemon.id}`, configObj)
    .then( response => response.json())
    .then( pokeData => {
        console.log(pokeData);
        const pokeItem = document.querySelector(`[pokemon-list-id="${pokeData.id}"]`)
        console.log(pokeItem);
        pokeItem.parentNode.removeChild(pokeItem);
    })
}

function createBtnEventListener(button, pokemon) {
    button.addEventListener("click", event => {
        releasePokemon(pokemon);
    })
}

document.addEventListener("DOMContentLoaded", event => {


    fetch(TRAINERS_URL)
    .then( response => response.json())
    .then( trainerData => {
        for (const trainer of trainerData) {
            const div = document.createElement("div");
            const para = document.createElement("p");
            para.innerText = `${trainer.name}`;
            div.appendChild(para)
            div.setAttribute("class", "card");
            div.setAttribute("data-id", `${trainer.id}`);
            const addPokemonBtn = document.createElement("button");
            addPokemonBtn.setAttribute("data-trainer-id", `${trainer.id}`);
            addPokemonBtn.setAttribute("class", "add")
            
            addPokemonBtn.innerText = "Add Pokemon";
            
            addPokemonBtn.addEventListener("click", event => {
                
                if (trainer.pokemons.length >= 6){
                    return;
                } else {
                    addPokemon(trainer);
                }
            })
            
            div.appendChild(addPokemonBtn);
            
            const ul = document.createElement("ul");
            ul.setAttribute("trainer-list-id", `${trainer.id}`);
            div.appendChild(ul);
            
            const pokemons = trainer.pokemons
            for (const pokemon of pokemons) {
                const li = document.createElement("li");
                li.setAttribute("pokemon-list-id", `${pokemon.id}`)
                li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
                const deleteButton = document.createElement("button");
                deleteButton.setAttribute("class", "release");
                deleteButton.setAttribute("data-pokemon-id", `${pokemon.id}`);
                deleteButton.innerText = "Release";
                createBtnEventListener(deleteButton, pokemon);
                li.appendChild(deleteButton);
                ul.appendChild(li);
            }
            main.appendChild(div);
        }
    })


})

