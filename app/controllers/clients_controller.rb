class ClientsController < ApplicationController
  def index
    respond_with Client.all
  end

  def create

    respond_with Client.create(client_params)
  end

  def show

    respond_with Client.find(params[:id])
  end

  def destroy
    respond_with Client.destroy(params[:id])
  end

  private
  def client_params
    params.require(:client).permit(:firstName, :lastName, :birthDate, :language, :maritalStatus, :PSP, :SSN, :branch_id)
  end
end
