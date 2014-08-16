class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :client_id
      t.string :user_id
      t.string :title
      t.string :notes
      t.integer :sort
      t.string :category
      t.string :listed_in
      t.datetime :completed_on

      t.timestamps
    end
  end
end
