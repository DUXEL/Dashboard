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

  def posts(filter)
    options = Hash.new
    options[:lang] = filter.language
    options[:count] = 10
    q = "since:#{filter.start_date} until:#{filter.end_date}"
    tweets = Array.new
    filter.country_list.each do |country|
      geocode = "#{country.latitude},#{country.longitude},500km"
      options[:geocode] = geocode
      var = @twitter_accessor.search(q,options)
      var.take(1).collect do |tweet|
        tweets.push("#{tweet.text}")
      end
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