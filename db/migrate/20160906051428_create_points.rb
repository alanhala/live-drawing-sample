class CreatePoints < ActiveRecord::Migration[5.0]
  def change
    create_table :points do |t|
      t.integer :x
      t.integer :y
      t.references :drawing
    end
  end
end
