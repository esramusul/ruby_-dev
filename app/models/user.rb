class User < ApplicationRecord
  has_many :scales,  dependent: :destroy
  has_many :surveys, dependent: :destroy

  validates :forename, :surname, :hashed_password, presence: true
  validates :credit_balance, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  def full_name = "#{forename} #{surname}"
end
