class Scale < ApplicationRecord
  belongs_to :user
  has_many :surveys, dependent: :destroy

  validates :unique_scale_id, :title, presence: true
  validates :unique_scale_id, uniqueness: true
end
