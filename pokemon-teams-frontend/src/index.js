const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(response => response.json())
.then(function(json){
    const main = document.querySelector('main');
    for(const trainer of json){
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        let p = document.createElement('p');
        p.innerText = trainer.name;
        console.log(trainer);
        card.appendChild(p);
        let pokelist = document.createElement('ul');
        const add = document.createElement('button');
        add.innerText = 'Add Pokémon';
        add.setAttribute('data-trainer-id', trainer.id);
        add.addEventListener('click', function(){
            console.log(trainer)
            const configurationObject = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                //   "Accept": "application/json"
                },
                body: JSON.stringify({
                  trainer_id: trainer.id
                })
            };
            
            function createPokemon(){
              console.log('add');
                console.log(POKEMONS_URL)
                console.log(configurationObject)
              fetch(POKEMONS_URL, configurationObject)
              .then(response => {
                  console.log('why!!!!')
                  console.log(response);
                //   response.json();
              })
              .then(data => {
                  console.log(data)
                  return data  
              })
              .catch(error => console.log(error));
            }

            if(trainer.pokemons.length < 6) {
              console.log("invoke createPokemon()")  
              createPokemon();
            }
            else {
                console.log('you have too many pokémon');
            }


        });
        card.appendChild(add);
        card.appendChild(pokelist);
        main.appendChild(card);
        for(const pokemon of trainer.pokemons){
            let li = document.createElement('li');
            li.innerText = `${pokemon.nickname} the ${pokemon.species}`;
            let release = document.createElement('button');
            release.innerText = "Release"
            li.appendChild(release);
            release.addEventListener('click', function(){
                let delconfig = {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json"
                    }
                }
                function releasePokemon() {
                  console.log('del');
                  console.log(pokemon)
                  return fetch(`${BASE_URL}/pokemons/${pokemon.id}`, delconfig)
                  .then(response => response.json())
                  .then(json => console.log(json))
                  .catch(error => console.log(error));
                }
                releasePokemon();
            })
            pokelist.appendChild(li);
        }
    }
})
.catch(error => console.log("o no"));