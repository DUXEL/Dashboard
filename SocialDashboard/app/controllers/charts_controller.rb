class ChartsController < ApplicationController

  before_action :set_chart_service, only: [:create]

  def create
    render text: "Funciona"
  end

  private
    def create_graph_chart

    end

    def create_trends_chart

    end

    def create_popular_terms_chart

    end

    def graph_to_json

    end

    def set_chart_service
      @chart_service = ChartService.new
    end
end