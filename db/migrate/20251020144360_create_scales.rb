class CreateScales < ActiveRecord::Migration[8.0]
  def change
    create_table :scales do |t|
      t.references :user, null: false, foreign_key: true
      t.string :unique_scale_id
      t.string :title
      t.string :version
      t.datetime :last_validation_date
      t.boolean :is_public

      t.timestamps
    end
  end
end
