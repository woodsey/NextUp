class RemoveClientIdFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :client_id, :string
  end
end
