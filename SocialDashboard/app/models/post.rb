class Post

  attr_accessor(:content, :creation_date, :score)

  def initialize(content, creation_date, score)
    @content = content
    @creation_date = creation_date
    @score = score
  end
end