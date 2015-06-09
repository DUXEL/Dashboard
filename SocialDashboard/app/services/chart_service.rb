class ChartService

  def initialize
    @api_accessor = APIAccessor.new
  end

  def calculate_density(graph)

  end

  def calculate_centrality(graph)

  end

  def calculate_distance(graph)

  end

  def get_trends(filter)
    trends_hash = Hash.new
    filter.country_list.each do |country|
      country_trends = @api_accessor.get_trending_topics(country)
      country_trends
      country_trends.each do |trend|
        if not trends_hash.has_key?(trend)
          trends_hash[trend] = 1
        else
          trends_hash[trend] += 1
        end
      trend
      end
    end
    all_trends = trends_hash.sort_by { |name, amount| amount }
    top_ten = all_trends.drop(10)
    phrase_list = Array.new
    top_ten.each do |phrase|
      p = Phrase.new(phrase[0], phrase[1])
      phrase_list.append(p)
    end
    phrase_list
  end

  def get_popular_terms(filter)

  end

  def get_network(filter)

  end

  def get_network_aux(username, current_level)

  end
end