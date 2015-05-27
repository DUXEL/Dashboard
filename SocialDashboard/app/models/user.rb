class User

  attr_accessor(:username, :image_url, :country)

  def initialize(username, image_url = nil, country)
    @username = username
    @image_url = image_url
    @country = country
  end
end