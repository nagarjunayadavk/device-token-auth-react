module AuthenticationRails
    class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    
      def omniauth_success
      get_resource_from_auth_hash
      set_token_on_resource
      create_auth_params

      if confirmable_enabled?
        # don't send confirmation email!!!
        @resource.skip_confirmation!
      end

      sign_in(:user, @resource, store: false, bypass: false)
  
      if @resource.save
        yield @resource if block_given?
        render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
      else
      #   render json: {
      #   status: 'error',
      #   data:   resource_data,
      #   errors: resource_errors
      # }, status: 422
      # byebug
        render_data_or_redirect('authFailure', error: resource_errors[:full_messages])

      end
    end

      protected
      # break out provider attribute assignment for easy method extension
      def assign_provider_attrs(user, auth_hash)
        # p auth_hash.to_json
        # p user.to_json
        if auth_hash['provider'] == 'facebook'
          user.assign_attributes({
            firstname: auth_hash['info']['firstname'],
            name:     auth_hash['info']['name'],
            image:    auth_hash['info']['image'],
            email:    auth_hash['info']['email']
          })
        elsif auth_hash['provider'] == 'github'
            user.assign_attributes({
              firstname: auth_hash['info']['name'],
              name:     auth_hash['info']['name'],
              image:    auth_hash['info']['image'],
              email:    auth_hash['info']['email']
            })
        else
          super
        end
      end


    end
  end