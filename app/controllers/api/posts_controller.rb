module Api
    class PostsController < ApplicationController
      before_action :authenticate_api_user!, only: [:create, :edit, :update, :destroy]
      before_action :set_post, only: [:show, :edit, :update, :destroy]

      # GET /posts
      # GET /posts.json
      def index
        @posts = Post.all
        render json: @posts
      end

      # GET /posts/1
      # GET /posts/1.json
      def show
        render json: @post
      end

      # GET /posts/new
      def new
        @post = Post.new
      end

      # GET /posts/1/edit
      def edit
      end

      # POST /posts
      # POST /posts.json
      def create
        @post = Post.new(post_params)
        @post.user = User.find_by_uid(request.headers[:uid])
        # p post_params
        if @post.save
          render json: @post, status: :created, notice: 'Post was successfully created.'
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /posts/1
      # PATCH/PUT /posts/1.json
      def update
        if @post.update(post_params)
          render json: { message: 'Post was successfully updated.' }
        else
          render json: @post.errors, status: :unprocessable_entity 
        end
      end

      # DELETE /posts/1
      # DELETE /posts/1.json
      def destroy
        @post.destroy
        render json: { message: 'Post was successfully deleted.' }
        # respond_to do |format|
        #   format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
        #   format.json { message: 'Post was successfully deleted.' }
        # end
      end
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_post
          @post = Post.find(params[:id])
        end

        # Never trust parameters from the scary internet, only allow the white list through.
        def post_params
          params.require(:post).permit(:title, :content)
        end
    end
end

