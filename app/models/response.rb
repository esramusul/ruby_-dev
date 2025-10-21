class Response < ApplicationRecord
  belongs_to :survey
  has_many   :analysis_results, dependent: :destroy

  validates :participant_id, presence: true
end
