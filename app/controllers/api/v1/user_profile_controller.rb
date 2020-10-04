# module Api::V1
        class UserProfileController < ApplicationController
            # before_action :authenticate_user!
            def profile
                p "profile page"
            end

            def edit_profile
            end
        end
# end