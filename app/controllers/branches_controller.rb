class BranchesController < ApplicationController
  def index
    respond_with Branch.all
  end

  def create

    respond_with Branch.create(branch_params)
  end

  def show

    respond_with Branch.find(params[:id])
  end

  def destroy
    respond_with Branch.destroy(params[:id])
  end

  private
  def branch_params
    params.require(:branch).permit(:title, :code)
  end
end
