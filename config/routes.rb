Rails.application.routes.draw do
  get 'home/index'

  root 'home#index'

  namespace :api, format: 'json' do
    resources :tasks, only: [:index, :create, :update]
  end
end
