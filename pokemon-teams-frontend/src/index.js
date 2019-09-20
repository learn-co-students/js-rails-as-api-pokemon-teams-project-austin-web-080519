const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", event => {

    fetch(TRAINERS_URL)
    .then( response => response.json())
    .then( trainerData => {
        console.log(trainerData);
        for (const trainer of trainerData) {
            const div = document.createElement("div");
            const para = document.createElement("p");
            para.innerText = `${trainer.name}`;
            div.appendChild(para)
            div.setAttribute("class", "card");
            div.setAttribute("data-id", `${trainer.id}`);
            const addPokemon = document.createElement("button");
            addPokemon.setAttribute("data-trainer-id", `${trainer.id}`);
            addPokemon.innerText = "Add Pokemon";
            div.appendChild(addPokemon);
            const ul = document.createElement("ul");
            div.appendChild(ul);
            const pokemons = trainer.pokemons
            for (const pokemon of pokemons) {
                const li = document.createElement("li");
                li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
                ul.appendChild(li);
            }
            main.appendChild(div);
        }
    })




})

