class SNAFilter

  attr_accessor(:social_network, :username, :depth_level)

  def initialize(social_network, username, depth_level)
    @social_network = social_network
    @username = username
    @depth_level = depth_level
  end
end