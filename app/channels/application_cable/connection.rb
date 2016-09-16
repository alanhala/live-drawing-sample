module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_user_id
    end

    protected

    def find_user_id
      @user_id ||= 1 + rand(10000)
    end
  end
end
