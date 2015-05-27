class FiltersController < ApplicationController

  before_action :set_filter_service, only: [:create, :update, :destroy, :edit, :test]

  def edit
    key = params[:id].to_sym
    json_object = @filter_service.get_filter(key)
    render json: json_object.to_json
  end

  def create
    @filter_service.add_filter(set_filter)
  end

  def update
    @filter_service.update_filter(params[:id], set_filter)
  end

  def destroy
    key = params[:id].to_sym
    @filter_service.remove_filter(key)
    render json: {"hola":"yico"}
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
        country_list.each do |country|
          c = Country.new(country.name, country.latitude, country.longitud)
          param_list.push(c)
        end
        filter = PhrasesFilter.new(params[:language], param_list, params[:start_time], params[:end_time])
      end
      return filter
    end
end