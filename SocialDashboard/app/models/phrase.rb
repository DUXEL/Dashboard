class Phrase

  attr_accessor(:text, :frequency)

  def initialize(text, frequency)
    @text = text
    @frequency = frequency
  end
end