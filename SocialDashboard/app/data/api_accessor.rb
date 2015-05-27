class APIAccessor

  def initialize
    initialize_twitter_client
    #initialize_kodu_client
  end

  def get_graph(filter)

  end

  def get_trending_topics(filter)

  end

  def get_popular_terms(filter)

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