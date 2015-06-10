require 'rgl/adjacency'

class ChartService

  def initialize
    @api_accessor = APIAccessor.new
  end

  def calculate_density(graph)
    node_amount = graph.vertices.length
    potential_connections = (node_amount * (node_amount - 1)) / 2
    actual_connections = graph.edges.length
    density = actual_connections / potential_connections
    density
  end

  def calculate_centrality(graph)
    node_amount = graph.vertices.length
    user = graph.vertices[0]
    user_connections = get_neighbor_amount(graph, user)
    centrality_degree = user_connections / node_amount
    centrality_degree
  end

  def calculate_distance(graph)

  end

  def get_trends(filter)
    trends_hash = Hash.new
    filter.country_list.each do |country|
      country_trends = @api_accessor.get_trending_topics(country)
      trends_hash = set_hash(country_trends, trends_hash)
    end
    all_trends = trends_hash.sort_by { |name, amount| amount }
    top_ten = all_trends.drop(10)
    phrase_list = Array.new
    top_ten.each do |phrase|
      p = Phrase.new(phrase[0], phrase[1])
      phrase_list.push(p)
    end
    phrase_list
  end

  def get_popular_terms(filter)

  end


  def get_graph(filter)
    root_user = @api_accessor.get_user(filter.username, filter.social_network)
    @user_hash = Hash.new
    @edges = Array.new
    @user_hash[filter.username] = root_user

    friends = @api_accessor.get_friends(filter.username, filter.social_network)
    followers = @api_accessor.get_followers(filter.username, filter.social_network)

    add_neighbors(friends, root_user, "friends")
    add_neighbors(followers, root_user, "followers")

    graph = RGL::DirectedAdjacencyGraph[*@edges]

  end

  def get_network(filter)


  end

  def get_network_aux(username, current_level)

  end

  private

    def add_neighbors(neighbors, root_user, type)
      neighbors.each do |neighbor|
        if not @user_hash.has_key?(neighbor.screen_name)
          @user_hash[neighbor.screen_name] = User.new(neighbor.screen_name, neighbor.profile_image_url, neighbor.location)
        end
        if type.eql?("friends")
          @edges.push(root_user)
          @edges.push(@user_hash[neighbor.screen_name])
        else
          @edges.push(@user_hash[neighbor.screen_name])
          @edges.push(root_user)
        end
      end
    end

    def get_neighbor_amount(graph, vertice)
      follows = graph.adjacent_vertices(vertice)
      followed = graph.reverse.adjacent_vertices(vertice)
      both = follows.zip(followed).flatten.compact
      neighbors = both.uniq.length
      neighbors
    end

    def set_hash(word_list, hash)
      word_list.each do |trend|
        if not hash.has_key?(trend)
          hash[trend] = 1
        else
          hash[trend] += 1
        end
      end
      hash
    end

end