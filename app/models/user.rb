class User < ActiveRecord::Base
  has_many :items


  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
		 
#	after_save :set_client_id
		 		 
	private

		def set_client_id
#			puts "-------------SET CLIENT ID HERE---------"
#			puts self.name
#			self.update(name: "Ed The Dude")
		end
		 
end
