# from .db import db


# class Review(db.Model):
#     __tablename__ = "reviews"

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     video_id = db.Column(db.Integer, db.ForeignKey("videos.id"))
#     header = db.Column(db.String(150), nullable=False)
#     body = db.Column(db.String(280), nullable=False)


#     user_info = db.relationship("User", back_populates="review_info")
#     video_info = db.relationship("Video", back_populates="review_info")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "video_id": self.video_id,
#             "header": self.header,
#             "body": self.body
#         }
