class AddDeletedColumnToItems < ActiveRecord::Migration
  def change
    add_column :items, :deleted, :integer
  end
end
