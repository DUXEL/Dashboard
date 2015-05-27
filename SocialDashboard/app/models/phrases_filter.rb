class PhrasesFilter

  attr_accessor(:language_list, :country_list, :start_date, :end_date)

  def initialize(language_list, country_list, start_date, end_date)
    @language_list = language_list
    @country_list = country_list
    @start_date = start_date
    @end_date = end_date
  end
end