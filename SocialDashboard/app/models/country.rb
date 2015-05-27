class Country

  attr_accessor(:name, :latitude, :longitude)

  def initialize(name, latitude = nil, longitude = nil)
    @name = name
    @latitude = latitude
    @longitude = longitude
  end
end