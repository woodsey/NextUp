class RemoveClientIdFromItems < ActiveRecord::Migration
  def change
    remove_column :items, :client_id, :integer
  end
end
