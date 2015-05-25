
class PagesController < ApplicationController

  #redirects to the homepage.
  def home
  end

  def add_chart
    type = params[:type]
    category = params[:category]

    if category.eql? "phrase"
      render 'filter/add_phrase_chart' , layout: false
    elsif category.eql? "sna"
      render 'filter/add_sna_chart' , layout: false
    end


  end

end