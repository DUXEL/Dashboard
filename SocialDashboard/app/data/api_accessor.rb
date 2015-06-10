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

    q = "\"The Flash\" since:#{filter.start_date} until:#{filter.end_date}"

    tweets = []

    filter.country_list.each do |country|
      geocode = "#{country.latitude},#{country.longitude},1000km" #"37.781157,-122.398720,1mi"
      options[:geocode] = geocode
      var = @twitter_client.search(q,options)
      var.take(1).collect do |tweet|
          puts "#{tweet.text}"
          tweets.push("#{tweet.text}")
      end
    end

    stopwords=[]
    File.open("config/stopwords/"+filter.language+".words", "r") do |f|
      f.each_line do |line|
        stopwords.push(line[0...-1])
      end
    end

    tweet_words = []
    tweets.each do |tweet|
      tweet_words = tweet.split(" ")
      stopwords.each do |sw|
        tweet_words.delete_if do |tw|
          if tw.to_s.eql? sw.to_s
            true
          end
        end
      end

      # remaining words
      tweet_words.each do |tw|
        puts tw
      end
      puts "============================"
    end

  end


  def get_followers(username)
    @twitter_client.followers(username).each.collect do |user|
      "#{user.screen_name}"
    end
  end

  def get_friends(username)
    @twitter_client.friends(username).each.collect do |user|
      "#{user.screen_name}"
    end
  end


  private

    def initialize_twitter_client
      @twitter_client = Twitter::REST::Client.new do |config|
        config.consumer_key        = ENV["consumer_key"]
        config.consumer_secret     = ENV["consumer_secret"]
        config.access_token        = ENV["access_token"]
        config.access_token_secret = ENV["access_token_secret"]
      end
    end

    def initialize_kodu_client
      @kodu_client = KoduClient.new
    end

end