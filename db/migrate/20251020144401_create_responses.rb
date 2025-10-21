class CreateResponses < ActiveRecord::Migration[8.0]
  def change
    create_table :responses do |t|
      t.references :survey, null: false, foreign_key: true
      t.string :participant_id
      t.datetime :submitted_at
      t.json :raw_data

      t.timestamps
    end
  end
end
