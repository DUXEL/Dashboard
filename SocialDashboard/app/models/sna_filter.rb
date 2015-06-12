class SNAFilter

  attr_accessor(:social_network, :username, :depth_level, :type)

  def initialize(social_network, username, depth_level, type)
    @social_network = social_network
    @username = username
    @depth_level = depth_level
    @type = type
  end
end