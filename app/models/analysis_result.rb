class AnalysisResult < ApplicationRecord
  belongs_to :response
  validates :cost, numericality: { greater_than_or_equal_to: 0 }
end
