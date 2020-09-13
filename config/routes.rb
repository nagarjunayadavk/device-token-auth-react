Rails.application.routes.draw do
  # get 'dashboard/index'
  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        omniauth_callbacks: 'authentication_rails/omniauth_callbacks'
      }
    end
  end

  root 'dashboard#index'
  # IMPORTANT #
  # This `match` must be the *last* route in routes.rb
  match '*path', to: 'dashboard#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
