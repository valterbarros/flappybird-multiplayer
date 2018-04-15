Rails.application.routes.draw do
  root to: "pages#home"

  get  "/login", to: "auth#new"
  post "/login", to: "auth#create"
end
