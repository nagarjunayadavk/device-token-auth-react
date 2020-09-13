class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    include DeviseTokenAuth::Concerns::SetUserByToken
end
