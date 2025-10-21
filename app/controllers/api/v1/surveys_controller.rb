module Api
  module V1
    class SurveysController < ::ApplicationController
      before_action :set_survey, only: %i[show update destroy]

      def index  = render json: Survey.all
      def show   = render json: @survey

      def create
        survey = Survey.new(survey_params)
        survey.save ? render(json: survey, status: :created) :
                      render(json: { errors: survey.errors.full_messages }, status: :unprocessable_entity)
      end

      def update
        @survey.update(survey_params) ? render(json: @survey) :
                                        render(json: { errors: @survey.errors.full_messages }, status: :unprocessable_entity)
      end

      def destroy
        @survey.destroy!
        head :no_content
      end

      private
      def set_survey    = @survey = Survey.find(params[:id])
      def survey_params = params.require(:survey).permit(:user_id, :scale_id, :title, :status, :distribution_mode, :is_mobile_friendly)
    end
  end
end
