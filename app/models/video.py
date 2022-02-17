from email.policy import default
from .db import db

class Video(db.Model):
    __tablename__ = "videos"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    url = db.Column(db.String(280), nullable=False)


    list_info = db.relationship("List", back_populates="video_info")


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'summary': self.summary,
            'url': self.url
        }
