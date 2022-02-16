from .db import db


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)
    header = db.Column(db.String(150), nullable=False)
    body = db.Column(db.String(280), nullable=False)


    user_info = db.relationship("User", back_populates="review_info")
