class PhrasesFilter

  attr_accessor(:language, :country_list, :start_date, :end_date, :type)

  def initialize(language, country_list, start_date, end_date, type)
    @language = language
    @country_list = country_list
    @start_date = start_date
    @end_date = end_date
    @type = type
  end
end