class APIAccessor

  def initialize
    initialize_twitter_client
    #initialize_kodu_client
  end

  def get_graph(filter)

  end

  def get_trending_topics(country)
    puts @twitter_client
    puts country.woeid
    country_trends = @twitter_client.trends(country.woeid)
    country_trends.take(10).collect do |tweet|
      "#{tweet.name}"
    end
    #return country_trends
  end

  def get_available_woeid
     var = @twitter_client.trends_available
    var.each do |v|
      puts "#{v.name} , #{v.id}"
    end
    return true
  end


  def get_popular_terms(filter)# This param is a PhraseFilter
    options = {}
    options[:lang] = filter.language
    options[:count] = 10
    options[:until] = "#{filter.end_date}"
    q = nil
    #q = "siince:#{filter.start_date} until:#{filter.end_date}"
    results = Array.new
    filter.country_list.each do |country|
      geocode = "#{country.latitude},#{country.longitude},56mi"
      options[:geocode] = geocode
      var = @twitter_client.search(nil,options)
      var.each.collect do |tweet|
          "#{tweet.text}"
      end
    end
  end


  def get_followers(username)
    @twitter_client.followers(username).each.collect do |user|
      "#{user.screen_name}"
    end
  end

  def get_friends(user)
    @twitter_client.friends(username).each.collect do |user|
      "#{user.screen_name}"
    end
  end


  private

    def initialize_twitter_client
      @twitter_client = Twitter::REST::Client.new do |config|
        config.consumer_key        = "VsOQsvlSupZW28ALI6PH4aan5"
        config.consumer_secret     = "IoZGeuxJAIP4ryS4yiscBJM7HC34VNQTS2lNScNk5yjo27cG24"
        config.access_token        = "3290559083-s5Ocy79jPz2k35vwTqNjYrkOdcXmexPDsPd4cMQ"
        config.access_token_secret = "ZuuxBToNh46XARERWbCYRRnskTFSMiv9HUN58HleiyRTo"
      end
    end

    def initialize_kodu_client
      @kodu_client = KoduClient.new
    end

end