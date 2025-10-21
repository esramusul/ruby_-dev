class CreateAnalysisResults < ActiveRecord::Migration[8.0]
  def change
    create_table :analysis_results do |t|
      t.references :response, null: false, foreign_key: true
      t.integer :cost
      t.string :activity_type
      t.datetime :transaction_date
      t.integer :reference_id

      t.timestamps
    end
  end
end
