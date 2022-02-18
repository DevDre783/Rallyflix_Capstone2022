from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Video, Profile, User, db

video_routes = Blueprint('videos', __name__)


@video_routes.route('/')
@login_required
def load_videos():
    videos = Video.query.order_by(Video.id).all()
    return {'videos': [video.to_dict() for video in videos ]}
