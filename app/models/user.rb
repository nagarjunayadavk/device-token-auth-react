# frozen_string_literal: true

class User < ActiveRecord::Base

  extend Devise::Models #added this line to extend devise model  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, 
         :omniauthable, omniauth_providers: [:facebook]
         
  include DeviseTokenAuth::Concerns::User
  validates :email, uniqueness: true
  has_many :posts
  has_many :comments

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).find_or_create_by do |user|
     user.provider = auth.provider
     user.uid = auth.uid
     user.name = auth.info.name
     user.email = auth.info.email
    end
 end
 
end

