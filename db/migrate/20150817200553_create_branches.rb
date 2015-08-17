class CreateBranches < ActiveRecord::Migration
  def change
    create_table :branches do |t|
      t.string :title
      t.string :code

      t.timestamps null: false
    end
  end
end
