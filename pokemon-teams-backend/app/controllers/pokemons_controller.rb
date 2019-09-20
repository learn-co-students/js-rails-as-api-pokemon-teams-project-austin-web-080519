class PokemonsController < ApplicationController
    def create
        puts "IN CREATE!!!!!!"
        trainer_id = params.require(:pokemon).permit(:trainer_id)[:trainer_id ]
        puts trainer_id
        nickname = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: trainer_id)
        # redirect_to pokemons_path(pokemon)
        # pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end
    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end
    def destroy
        puts "destroy time!!!!>>>"
        puts params.inspect
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
        Pokemon.destroy(pokemon.id)
    end
end
