class TwitterClient

  def initialize
    initialize_twitter_client
  end

  def followers(username)
    @twitter_accessor.followers(username).each.collect do |user|
      "#{user.screen_name}"
    end
  end

  def friends(username)
    @twitter_accessor.friends(username).each.collect do |user|
      "#{user.screen_name}"
    end
  end

  def trends(country)
    trends = @twitter_accessor.trends(country.woeid)
    trends.take(10).collect do |post|
      "#{post.name}"
    end
  end

  def posts(country,lang,end_date,start_date)
    options = Hash.new
    options[:lang] = lang
    options[:count] = 10
    q = "since:#{start_date} until:#{end_date}"
    tweets = Array.new
    geocode = "#{country.latitude},#{country.longitude},500km"
    options[:geocode] = geocode
    post_list = @twitter_accessor.search(q,options)
    post_list.take(10).collect do |tweet|
      tweets.push("#{tweet.text}")
    end
    tweets
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