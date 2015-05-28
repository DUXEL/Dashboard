class Country

  attr_accessor(:name, :latitude, :longitude, :woeid)

  def initialize(name, latitude = nil, longitude = nil, woeid = nil)
    @name = name
    @latitude = latitude
    @longitude = longitude
    @woeid = woeid
  end
end