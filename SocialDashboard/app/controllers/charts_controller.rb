class ChartsController < ApplicationController

  before_action :set_chart_service, only: [:create]

  def create
    json_filter = cookies[params[:key]]
    filter = get_cookie_filter(json_filter,params[:type])
    render json: self.send("create_#{params[:type]}_chart", filter)
  end


  private

    def create_graph_chart(filter)
      @chart_service.get_graph(filter)
    end


    def create_trends_chart(filter)
      @chart_service.get_trends(filter)
    end


    def create_popular_terms_chart(filter)
      @chart_service.get_popular_terms(filter)

    end


    def set_chart_service
      @chart_service = ChartService.new
    end


    #Returns the filter object depending on the input type.
    def get_cookie_filter(json_filter, type)
      data = JSON.parse(json_filter)
      if type.eql?("trends") || type.eql?("popular_terms")
        filter = PhrasesFilter.new(data['language'], generate_country_list(data['country_list']), data['start_date'], data['end_date'],data['type'])
      else
        filter = SNAFilter.new(data['social_network'], data['username'], data['depth_level'],data['type'])
      end
    end


    #Creates an array of countrys using hash data.
    def generate_country_list(countries_hash)
      country_list = countries_hash.map { |c| Country.new(c['name'], c['latitude'], c['longitude'], c['woeid']) }
    end
end