# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(
      'http://localhost:5175',    # Vite şu an burada
      'http://localhost:5174',
      'http://localhost:5173',
      'http://127.0.0.1:5175',
      'http://127.0.0.1:5173'
    )

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
