class CookieAccessor

  def save(map)
    filters = [:filter1, :filter2, :filter3, :filter4, :filter5, :filter6]
    i = 0
    while cookies[filters[i]] =! nil
      i+=1
    end
    cookies[filters[i]] = map
  end

  def find(key)
    return cookies[key]
  end

  def update(key, map)
    cookies[key] = map
  end

  def delete(key)
    cookies[key] = nil
  end
end