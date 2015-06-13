class User

  attr_accessor(:username, :image_url, :country)

  def initialize(username, image_url = nil)
    @username = username
    @image_url = image_url
  end
end