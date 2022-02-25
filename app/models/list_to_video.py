from .db import db


list_to_videos = db.Table(
    "list_to_videos",
    db.Column(
        "list_id",
        db.Integer,
        db.ForeignKey("lists.id"),
        primary_key=True
    ),
    db.Column(
        "video_id",
        db.Integer,
        db.ForeignKey("videos.id"),
        primary_key=True
    )
)
