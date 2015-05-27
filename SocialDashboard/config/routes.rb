Rails.application.routes.draw do

  root 'pages#home'

  #Route for changing application language.
  get '/change_locale/:locale', to: 'languages#change_locale', as: :change_locale


  #Routes for filter controller.
  get '/filters/new', to: 'filters#new'
  get '/filters/:id/edit', to: 'filters#edit'
  delete '/filters/:id', to: 'filters#destroy'
  post '/filters', to: 'filters#create'
  put '/filters', to: 'filters#update'


  #Route for chart controller.
  post '/charts', to: 'charts#create'
end