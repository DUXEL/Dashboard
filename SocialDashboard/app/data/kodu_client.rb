class KoduClient

  #This class is not implemented. It returns empty Arrays in every method.

  def followers(username)
    Array.new
  end


  def friends(username)
    Array.new
  end


  def trends(country)
    Array.new
  end


  def posts(country,lang,end_date,start_date, post_quantity)
    Array.new
  end


  def user(username)
    User.new('username', 'imageURL')
  end
end