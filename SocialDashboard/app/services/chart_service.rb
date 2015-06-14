require 'rgl/adjacency'
require 'json'

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
    1
  end

  def calculate_network(graph)
    ""
  end

  def get_trends(filter)
    trends_hash = Hash.new
    filter.country_list.each do |country|
      country_trends = @api_accessor.get_trending_topics(country)
      trends_hash = set_hash(country_trends, trends_hash)
    end
    all_trends = (trends_hash.sort_by { |name, amount| amount }).reverse
    top_trends = all_trends.take(10)
    phrase_list = set_phrase_hash_list(top_trends)
    phrase_list
  end

  def get_popular_terms(filter)
    country_list = filter.country_list
    posts = Array.new
    post_quantity = (700/country_list.length).round
    country_list.each do |country|
      (posts << @api_accessor.get_posts(country,filter.language,filter.end_date,filter.start_date, post_quantity)).flatten!
    end
    post_hash = Hash.new
    stop_words = read_stop_words(filter.language)
    post_words = delete_stop_words(posts,stop_words)
    post_hash = set_hash(post_words, post_hash)
    ordered_posts = (post_hash.sort_by { |post, amount| amount }).reverse.take(200)
    phrase_list = set_phrase_hash_list(ordered_posts)
    phrase_list
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
    get_graph_json_response(graph, filter.type)
  end

  private

    def add_neighbors(neighbors, root_user, type)
      neighbors.each do |neighbor|
        if not @user_hash.has_key?(neighbor.screen_name)
          @user_hash[neighbor.screen_name] = User.new(neighbor.screen_name, neighbor.profile_image_url.to_s)
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

    def read_stop_words(lang)
      stop_words = Array.new
      File.open("config/stopwords/"+lang+".words", "r") do |f|
        f.each_line do |line|
          stop_words.push(line[0...-1])
        end
      end

      File.open("config/stopwords/symbols", "r") do |f|
        f.each_line do |line|
          stop_words.push(line[0...-1])
        end
      end

      stop_words
    end

    def delete_stop_words(posts,stop_words)
      result = Array.new
      posts.each do |post|
        post_words = post.split(" ")
        stop_words.each do |sw|
          post_words.delete_if do |pw|
            if pw.to_s.downcase.eql? sw.to_s
              true
            end
          end
        end
        (result << post_words).flatten!
      end
      result
    end

    def graph_to_json(graph)
      res = Hash.new
      res[:directed] = true
      res[:graph] = Array.new
      res[:multigraph] = false

      node_list = Array.new
      link_list = Array.new
      node_index = Hash.new

      graph_vertices = graph.vertices

      graph_vertices.each_with_index do | element, index|
        node_index[element.username] = index
      end

      graph_vertices.each do |v|
        node_list.push(get_user_hash(v))
        source = node_index[v.username]
        graph.adjacent_vertices(v).each do |ad_v|
          link = Hash.new
          link[:source] = source
          link[:target] = node_index[ad_v.username]
          link_list.push(link)
        end
      end
      res[:nodes] = node_list
      res[:links] = link_list
      res
    end

    def get_graph_json_response(graph, type)
      json_response = Hash.new
      json_response[:graph] = graph_to_json(graph)
      json_response[:value] = self.send("calculate_#{type}", graph)
      json_response
    end

    def get_user_hash(user)
      res = Hash.new
      res[:id] = user.username
      res[:link] = user.image_url
      res
    end


    def set_phrase_hash_list(list)
      res = Array.new
      list.each do |post|
        p = Hash.new
        p[:key] = post[0]
        p[:value] = post[1]
        res.append(p)
      end
      res
    end

end