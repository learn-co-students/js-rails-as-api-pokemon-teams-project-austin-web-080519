Rails.application.routes.draw do
    get '/trainers' => 'trainers#index'
    # get '/pokemons' => 'pokemons#new'
    post '/pokemons' => 'pokemons#create'



end
