json.array!(@items) do |item|
  @dt=time_ago_in_words(item.created_at)
  if !item.completed_on.nil?
	@cdt=time_ago_in_words(item.completed_on)
  end
  json.extract! item, :id, :user_id, :title, :notes, :sort, :category, :listed_in, :created_at, :completed_on
  json.url item_url(item, format: :json)
  json.created_on_txt @dt
  json.completed_on_txt @cdt
end
