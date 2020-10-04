class Api::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    include Devise::Controllers::Rememberable
  
    def omniauth_success
      get_resource_from_auth_hash
      set_token_on_resource
      create_auth_params
  
      if resource_class.devise_modules.include?(:confirmable)
        # don't send confirmation email!!!
        @resource.skip_confirmation!
      end
     
      # ================================================
      # Update here to Model Class
      # from :
           sign_in(:user, @resource, store: false, bypass: false)
      # to: 
    #   sign_in(:traveler, @resource, store: false, bypass: false)
  
      @resource.save!
  
      yield @resource if block_given?
  
      render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
  
    end
  
    protected
    def get_resource_from_auth_hash
      # find or create user by provider and provider uid
  
      # ================================================
      # Update here to Model Class
      # from :
      #    @resource = resource_class.where(
      # to: 
      @resource = resource_class.where({
        uid:      auth_hash['uid'],
        provider: auth_hash['provider']
      }).first_or_initialize
      
    #   find_or_create_by

    p "@resource start"
    p @resource
    p "@resource end"
      if @resource.new_record?
        handle_new_resource
      end
  
      # sync user info with provider, update/generate auth token
      assign_provider_attrs(@resource, auth_hash)
  
      # assign any additional (whitelisted) attributes
      if assign_whitelisted_params?
        extra_params = whitelisted_params
        @resource.assign_attributes(extra_params) if extra_params
      end
  
      @resource
    end
  
  end