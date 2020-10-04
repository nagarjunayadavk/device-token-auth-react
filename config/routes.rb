Rails.application.routes.draw do
  # get 'commnets/index'
  # get 'dashboard/index'
  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        omniauth_callbacks: 'authentication_rails/omniauth_callbacks'
      }

      resources :posts
      resources :comments
      get 'profile', to: 'profile#profile'
      post 'update_profile', to: 'profile#edit_profile'
    end
  end

  # namespace :api, defaults: { format: 'json' } do
  #   scope :v1 do
      
  #   end
  # end

  root 'dashboard#index'
  # IMPORTANT #
  # This `match` must be the *last* route in routes.rb
  match '*path', to: 'dashboard#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
