# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_20_144402) do
  create_table "analysis_results", force: :cascade do |t|
    t.integer "response_id", null: false
    t.integer "cost"
    t.string "activity_type"
    t.datetime "transaction_date"
    t.integer "reference_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["response_id"], name: "index_analysis_results_on_response_id"
  end

  create_table "responses", force: :cascade do |t|
    t.integer "survey_id", null: false
    t.string "participant_id"
    t.datetime "submitted_at"
    t.json "raw_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["survey_id"], name: "index_responses_on_survey_id"
  end

  create_table "scales", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "unique_scale_id"
    t.string "title"
    t.string "version"
    t.datetime "last_validation_date"
    t.boolean "is_public"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_scales_on_user_id"
  end

  create_table "surveys", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "scale_id", null: false
    t.string "title"
    t.string "status"
    t.string "distribution_mode"
    t.boolean "is_mobile_friendly"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["scale_id"], name: "index_surveys_on_scale_id"
    t.index ["user_id"], name: "index_surveys_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "forename"
    t.string "surname"
    t.string "hashed_password"
    t.integer "credit_balance"
    t.string "role"
    t.string "language"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "analysis_results", "responses"
  add_foreign_key "responses", "surveys"
  add_foreign_key "scales", "users"
  add_foreign_key "surveys", "scales"
  add_foreign_key "surveys", "users"
end
