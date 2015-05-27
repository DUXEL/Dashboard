class FiltersController < ApplicationController

  before_action :set_filter_service, only: [:create, :update, :destroy, :edit]

  def new
    type = params[:type]
    category = params[:category]

    if category.eql? "phrase"
      render 'filters/add_phrase_chart' , layout: false
    elsif category.eql? "sna"
      render 'filters/add_sna_chart' , layout: false
    end
  end

  def edit

  end

  def create

  end

  def update

  end

  def destroy

  end

  private
    def set_filter_service
      @filter_service = FilterService.new
    end

end