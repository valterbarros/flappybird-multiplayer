class FlappyBirdChannel < ApplicationCable::Channel
  def subscribed
    stream_from "flappybird"
  end

  def jump
    ActionCable.server.broadcast "flappybird", {}
  end
end
