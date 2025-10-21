module Api
  module V1
    class ResponsesController < ::ApplicationController
      before_action :set_response, only: %i[show update destroy]

      def index  = render json: Response.all
      def show   = render json: @response

      def create
        response = Response.new(response_params)
        response.save ? render(json: response, status: :created) :
                        render(json: { errors: response.errors.full_messages }, status: :unprocessable_entity)
      end

      def update
        @response.update(response_params) ? render(json: @response) :
                                            render(json: { errors: @response.errors.full_messages }, status: :unprocessable_entity)
      end

      def destroy
        @response.destroy!
        head :no_content
      end

      private
      def set_response    = @response = Response.find(params[:id])
      def response_params = params.require(:response).permit(:survey_id, :participant_id, :submitted_at, :raw_data)
    end
  end
end
