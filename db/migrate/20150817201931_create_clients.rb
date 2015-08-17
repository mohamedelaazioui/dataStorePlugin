class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :firstName
      t.string :lastName
      t.date :birthDate
      t.string :language
      t.string :maritalStatus
      t.string :PSP
      t.string :SSN
      t.references :branch, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
