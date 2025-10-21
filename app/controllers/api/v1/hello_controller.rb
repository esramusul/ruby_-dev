module Api
  module V1
    class HelloController < ApplicationController
      def index
        render json: { ok: true, message: "Hello Ruby on Rails API from Scale Platform!" }
      end
    end
  end
end
