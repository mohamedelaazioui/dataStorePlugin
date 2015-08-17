class Branch < ActiveRecord::Base
  has_many :clients

  def as_json(options = {})
    super(options.merge(include: :clients))
  end
end
