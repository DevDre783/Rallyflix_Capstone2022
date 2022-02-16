from .db import db

class Video(db.Model):
    __tablename__ = "videos"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    summary = db.Column(db.String(280), nullable=False)
    url = db.Column(db.String(280), nullable=False)


    list_info = db.relationship("List", back_populates="video_info")
