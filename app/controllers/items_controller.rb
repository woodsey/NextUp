class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy, :complete]

  # GET /items
  # GET /items.json
  def index
	@user=current_user
	@userid=@user.id
	@list=params[:list]
	
	if @list=='' || @list.nil?
		@list="Now"	#default is to show now items
	end
	@items=current_user.items.where(listed_in: @list, deleted: nil)
	
	
  end

  # GET /items/1
  # GET /items/1.json
  def show
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(item_params)

	# add the user ID to the item, to link it accordingly
	@user=current_user
	@item.user_id=@user.id

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render :show, status: :created, location: @item }
      else
        format.html { render :new }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  def complete
	puts "--------------markcomplete method-----------"
	format.json { render json: "OK", status: "complete" }
  end
  
  
  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
	puts "--------------calling UPDATE-----------------"
	puts params
	
    respond_to do |format|
      if @item.update(item_params)
		@complete=params[:item][:complete]
		@move_to=params[:item][:listed_in]
		@action=params[:action]

		puts @complete
		puts @move_to
		puts @action
		
		# these params are not actually working... how do you parse params from the data????
		
		if !@complete==''
			puts "------------DOESNT EQUAL BLANK"
		end
		if !@complete.nil?
			puts "-------------NOT NIL....."
		end
		
		if !@complete=='' || !@complete.nil?
			puts "------------ITEM MARKED AS COMPLETE--------------"
			@item.completed_on=DateTime.now
		#	@item.listed_in="Archive"
			@item.save
		#	only need to call save if we make additional changes, other than the param ones
		end		
		
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        #format.json { render json: @user }
		format.json { render :show, status: :ok, location: @item }
      else
		puts "-------------second one------------"
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def item_params
		# parameters must be listed here before they can be retrieved from the web and set - important for ajax
      params.require(:item).permit(:user_id, :title, :notes, :sort, :category, :listed_in, :complete, :completed_on, :deleted)
    end
end
