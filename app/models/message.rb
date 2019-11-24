class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :body, presence: true, unless: :image?
  mount_uploader :image, Imageuploader
end
