class FlappyBirdChannel < ApplicationCable::Channel
  def subscribed
    stream_from "flappybird"
    ActionCable.server.broadcast("flappybird", 
                                 { action: :add_new_player, id: current_user })
  end

  def do_jump(data)
    ActionCable.server.broadcast "flappybird", { action: :do_jump, player_id: data['playerId'] }
  end
end
