class PokemonsController < ApplicationController

    def new
        pokemon = Pokemon.new
    end

    def create
        # render json: {trainer_id: @test}
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: poke_params[:trainer_id])
        # render json: pokemon, only: [:nickname, :species, :id]
    end

    def poke_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
