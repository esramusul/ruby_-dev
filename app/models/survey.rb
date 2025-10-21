class Survey < ApplicationRecord
  belongs_to :user
  belongs_to :scale
  has_many   :responses, dependent: :destroy

  STATUSES = %w[draft active closed].freeze
  validates :title, presence: true
  validates :status, inclusion: { in: STATUSES }
end
