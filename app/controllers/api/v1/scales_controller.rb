module Api
  module V1
    class ScalesController < ::ApplicationController
      before_action :set_scale, only: %i[show update destroy]

      def index  = render json: Scale.all
      def show   = render json: @scale

      def create
        scale = Scale.new(scale_params)
        scale.save ? render(json: scale, status: :created) :
                     render(json: { errors: scale.errors.full_messages }, status: :unprocessable_entity)
      end

      def update
        @scale.update(scale_params) ? render(json: @scale) :
                                      render(json: { errors: @scale.errors.full_messages }, status: :unprocessable_entity)
      end

      def destroy
        @scale.destroy!
        head :no_content
      end

      private
      def set_scale    = @scale = Scale.find(params[:id])
      def scale_params = params.require(:scale).permit(:user_id, :unique_scale_id, :title, :version, :last_validation_date, :is_public)
    end
  end
end
