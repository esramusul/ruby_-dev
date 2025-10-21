module Api
  module V1
    class AnalysisResultsController < ::ApplicationController
      before_action :set_analysis_result, only: %i[show update destroy]

      def index  = render json: AnalysisResult.all
      def show   = render json: @analysis_result

      def create
        ar = AnalysisResult.new(analysis_result_params)
        ar.save ? render(json: ar, status: :created) :
                  render(json: { errors: ar.errors.full_messages }, status: :unprocessable_entity)
      end

      def update
        @analysis_result.update(analysis_result_params) ? render(json: @analysis_result) :
                                                         render(json: { errors: @analysis_result.errors.full_messages }, status: :unprocessable_entity)
      end

      def destroy
        @analysis_result.destroy!
        head :no_content
      end

      private
      def set_analysis_result    = @analysis_result = AnalysisResult.find(params[:id])
      def analysis_result_params = params.require(:analysis_result).permit(:response_id, :cost, :activity_type, :transaction_date, :reference_id)
    end
  end
end
