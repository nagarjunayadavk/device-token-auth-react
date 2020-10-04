module Api
    class ProfileController < ApplicationController
        before_action :authenticate_api_user!

        def profile
            @user = User.select("provider, uid, firstname, lastname, email, image, id").find_by_uid(request.headers[:uid])
            render json: @user
        end

        def edit_profile
            if User.where(:uid => request.headers[:uid]).update_all(:provider => params[:provider], :uid => params[:uid], :firstname => params[:firstname], :lastname => params[:lastname] , :image => params[:image], :email => params[:email])
                render json: { message: 'User Profile was successfully updated.' }
              else
                render json: @post.errors, status: :unprocessable_entity 
              end
        end
    end
end