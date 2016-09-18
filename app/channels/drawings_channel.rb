class DrawingsChannel < ApplicationCable::Channel
  def subscribed
    stream_from room_name
  end

  def receive(data)
    ActionCable.server.broadcast(room_name, data)
  end

  private

  def room_name
    "chat_#{params[:room]}"
  end
end
