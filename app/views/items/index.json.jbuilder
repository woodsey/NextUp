json.array!(@items) do |item|
  json.extract! item, :id, :client_id, :user_id, :title, :notes, :sort, :category, :listed_in, :completed_on
  json.url item_url(item, format: :json)
end
