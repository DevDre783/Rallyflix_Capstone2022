from email.policy import default
from .db import db
from .list_to_video import list_to_videos


class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey("profiles.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"))
    videos = db.relationship(
        "Video",
        secondary=list_to_videos,
        back_populates="list_video_info"
    )


    profile_info = db.relationship("Profile", back_populates="list_info")
    video_info = db.relationship("Video", back_populates="list_info")


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'profile_id': self.profile_id,
            'video_id': self.video_id
        }
