require 'test_helper'

class ChartServiceTest < ActiveSupport::TestCase

  def test_calculate_density

  end

  def test_calculate_centrality

  end

  def test_calculate_distance
    @cs = ChartService.new
    graph = nil
    assert_equal @cs.calculate_distance(graph), 1
  end

  def test_calculate_network
    @cs = ChartService.new
    graph = nil
    assert_equal @cs.calculate_network(graph), ""
  end

  def test_get_trends
    usa = Country.new( "United States", latitude = nil, longitude = nil, woeid = 23424977)
    canada = Country.new( "Canada", latitude = nil, longitude = nil, woeid = 23424775)
    phrase_filter = PhrasesFilter.new(nil, [usa, canada], nil, nil, nil)

    cs = ChartService.new
    phrase_list = cs.get_trends(phrase_filter)

    assert_not_nil phrase_list
  end

  def test_get_popular_terms

  end

  def test_get_graph

  end

  # Private methods.

end