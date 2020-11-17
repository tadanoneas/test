Rails.application.routes.draw do
  get 'home/index'

  root 'home#index'
  get '/about',   to: 'home#index'
  get '/contact', to: 'home#index'

  namespace :api, format: 'json' do
    resources :tasks, only: [:index, :create, :update]
  end
end
