class PagesController < ApplicationController
  before_action :authenticate!

  def home; end

  private

  def authenticate!
    redirect_to login_path unless session[:username]
  end
end
