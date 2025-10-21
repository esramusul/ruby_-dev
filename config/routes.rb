Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Ödevin "Hello" kısmı
      get "hello", to: "hello#index"

      resources :users
      resources :scales
      resources :surveys
      resources :responses
      resources :analysis_results
    end
  end
end
