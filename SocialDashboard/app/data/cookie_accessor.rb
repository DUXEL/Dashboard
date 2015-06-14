class CookieAccessor

  def initialize(cookies)
    @cookies = cookies
  end

  def save(map)
    filters = [:filter1, :filter2, :filter3, :filter4, :filter5]
    i = 0
    while @cookies.has_key?(filters[i])
      i+=1
      if i > 4
        return -1
      end
    end
    @cookies[filters[i]] = map
    filters[i]
  end

  def find(key)
    @cookies[key]
  end

  def update(key, map)
    @cookies[key] = map
  end

  def delete(key)
    @cookies.delete key
  end
end