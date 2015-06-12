class FiltersController < ApplicationController

  before_action :set_filter_service, only: [:create, :update, :destroy, :edit, :test]

  def edit
    key = params[:id].to_sym
    json_object = @filter_service.get_filter(key)
    render json: json_object
  end

  def create
     key = @filter_service.add_filter(set_filter)
    render json: key
  end

  def update
    @filter_service.update_filter(params[:id], set_filter)
  end

  def destroy
    key = params[:id].to_sym
    @filter_service.remove_filter(key)
    render json: key
  end

  private
    def set_filter_service
      cookie_accessor = CookieAccessor.new(cookies)
      @filter_service = FilterService.new(cookie_accessor)
    end

    def set_filter
      if params[:type] == "sna"
        filter = SNAFilter.new(params[:social_network], params[:user], params[:depth_level])
      else
        param_list = []
        country_list = params[:countries]
        country_list.each_value do |country|
          c = Country.new(country[:name], country[:location][:latitude].to_f, country[:location][:longitude].to_f, country[:location][:woeid].to_i)
          param_list.push(c)
        end
        filter = PhrasesFilter.new(params[:language], param_list, params[:start_time], params[:end_time])
      end
      filter
    end
end