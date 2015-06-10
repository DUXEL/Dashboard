class APIAccessor

  def initialize
    @data_source = [TwitterClient.new, KoduClient.new]
  end

  def get_graph(filter)

  end

  def get_trending_topics(country)
    trends = Array.new
    @data_source.each do |client|
      current_trends = client.trends(country)
      (trends << current_trends).flatten!
    end
    trends
  end


  def get_popular_terms(filter)
    posts = Array.new
    @data_source.each do |client|
      current_posts = client.posts(filter)
      (posts << current_posts).flatten!
    end
    posts
  end

  def get_followers(username, social_network)
    get_client(social_network).followers(username)
  end

  def get_friends(username, social_network)
    get_client(social_network).friends(username)
  end

  private
    def get_client(social_network)
      @data_source.each do |client|
        if client.class.name.eql? "#{social_network}Client"
          return client
        end
      end
    end

end