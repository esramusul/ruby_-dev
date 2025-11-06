module Api
  module V1
    class AnalysisResultsController < ::ApplicationController
      before_action :set_analysis_result, only: %i[show update destroy]

      def index  = render json: AnalysisResult.all
      def show   = render json: @analysis_result

      def create
  # 1) Normal analiz kaydını oluştur
  ar = AnalysisResult.new(analysis_result_params)
 if ar.response_id.blank?
    return render json: { error: "response_id missing" }, status: :bad_request
  end
  # 2) İlişkili response'u bulalım (mesaj göstermek ve user'ı bulmak için)
  response = Response.find_by(id: ar.response_id)

  # 3) Varsayılan mesaj
  participant_msg = "Analiz tamamlandı"

  if response.present?
    # response.survey.user -> krediyi buradan düşeceğiz (varsa)
    participant_id = response.participant_id
    participant_msg = "#{participant_id} için analiz tamamlandı" if participant_id.present?
  end

  # 4) Kaydet
  unless ar.save
    return render json: { errors: ar.errors.full_messages }, status: :unprocessable_entity
  end

  # 5) Kullanıcının kredisini düş (varsa)
  remaining_credits = nil
  if response&.survey&.user
    user = response.survey.user
    # kredi varsa 1 düş
    if user.credit_balance.to_i > 0
      user.update!(credit_balance: user.credit_balance - 1)
    end
    remaining_credits = user.credit_balance
  end

  # 6) Frontend'in işine yarayacak şekliyle dön
  render json: {
  id: ar.id,
  response_id: ar.response_id,
  message: participant_msg,
  remaining_credits: remaining_credits, # artık 9 yazmıyoruz
  cost: ar.cost,
  activity_type: ar.activity_type,
  transaction_date: ar.transaction_date,
  reference_id: ar.reference_id
}, status: :created

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
