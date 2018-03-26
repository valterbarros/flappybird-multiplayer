class FlappyBirdChannel < ApplicationCable::Channel
  def subscribed
    stream_from "flappybird"
    ActionCable.server.broadcast "flappybird", { action: :add_new_player }
  end

  def do_jump
    ActionCable.server.broadcast "flappybird", { action: :do_jump}
  end
end
