Rails.application.routes.draw do
  root 'pages#home'

  get '/change_locale/:locale', to: 'languages#change_locale', as: :change_locale
end
