class FilterService

  require 'json'

  def initialize(cookie_accessor)
    @cookie_accessor = cookie_accessor
  end

  def add_filter(filter)
    return @cookie_accessor.save(filter.to_json)
  end

  def remove_filter(key)
    @cookie_accessor.delete(key)
  end

  def update_filter(key, filter)
    @cookie_accessor.update(key, filter.to_json)
  end

  def get_filter(key)
    return @cookie_accessor.find(key)
  end

end