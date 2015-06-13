class TwitterClient

  def initialize
    initialize_twitter_client
  end

  def followers(username)
    @twitter_accessor.followers(username)
  end

  def friends(username)
    @twitter_accessor.friends(username)
  end

  def trends(country)
    trends = @twitter_accessor.trends(country.woeid)
    trends.take(10).collect do |post|
      "#{post.name}"
    end
  end

  def posts(country,lang,end_date,start_date, tweet_quantity)
    options = Hash.new
    options[:lang] = lang if lang != nil
    if start_date !=nil
      q = "since:#{start_date} until:#{end_date}"
    else
      end_date = Time.now.strftime("%Y-%m-%d")
      start_date = (Time.now - 2592000).strftime("%Y-%m-%d") # A month ago
    end
    tweets = Array.new
    if country != nil
      geocode = "#{country.latitude},#{country.longitude},1000km"
    elsif
      # Latitude and longitude for Equator meridian
      geocode = "0,0,100000km"
    end
    options[:geocode] = geocode
    post_list = @twitter_accessor.search(q,options)
    post_list.take(tweet_quantity).collect do |tweet|
      tweets.push("#{tweet.text}")
    end
    tweets
  end

  def user(username)
    twitter_user = @twitter_accessor.user(username)
    User.new(username, twitter_user.profile_image_url, twitter_user.location)
  end

  private
    def initialize_twitter_client
      @twitter_accessor = Twitter::REST::Client.new do |config|
        config.consumer_key        = ENV["consumer_key"]
        config.consumer_secret     = ENV["consumer_secret"]
        config.access_token        = ENV["access_token"]
        config.access_token_secret = ENV["access_token_secret"]
      end
    end

end