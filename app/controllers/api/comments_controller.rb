module Api
    class CommentsController < ApplicationController
        before_action :authenticate_api_user!, only: [:create, :edit, :update, :destroy]
        before_action :set_comment, only: [:show, :edit, :update, :destroy]
      
        # GET /comments
        # GET /comments.json
        def index
          @comments = Comment.all
          render json: @comments
        end
      
        # GET /comments/1
        # GET /comments/1.json
        def show
            render json: @comment
        end
      
        # GET /comments/new
        def new
          @comment = Comment.new(post_id: params[:post_id])
        end
      
        # GET /comments/1/edit
        def edit
        end
      
        # POST /comments
        # POST /comments.json
        def create 
            
          post = Post.find(params[:post_id])
          @comment = post.comments.new(comment_params)
          @comment.user = User.find_by_uid(request.headers[:uid])
            if @comment.save
                render json: @comment, status: :created, notice: 'Comment was successfully created.'
            #   format.html { redirect_to @comment, notice: 'Comment was successfully created.' }
            #   format.json { render :show, status: :created, location: @comment }
            else
                render json: @comment.errors, status: :unprocessable_entity
            end

        end
      
        # PATCH/PUT /comments/1
        # PATCH/PUT /comments/1.json
        def update
            if @comment.update(comment_params)
              render json: { message: 'Comment was successfully updated.' }
            #   format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
            #   format.json { render :show, status: :ok, location: @comment }
            else
              render json: @comment.errors, status: :unprocessable_entity
            end
        end
      
        # DELETE /comments/1
        # DELETE /comments/1.json
        def destroy
          @comment.destroy
          render json: { message: 'Comment was successfully destroyed.' }
        #   respond_to do |format|
        #     format.html { redirect_to comments_url, notice: 'Comment was successfully destroyed.' }
        #     format.json { head :no_content }
        #   end
        end
      
        private
          # Use callbacks to share common setup or constraints between actions.
          def set_comment
            @comment = Comment.find(params[:id])
          end
      
          # Only allow a list of trusted parameters through.
          def comment_params
            params.require(:comment).permit(:body, :post_id)
          end
      end      
end