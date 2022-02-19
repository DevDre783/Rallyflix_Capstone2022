from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Video, Profile, User, db

video_routes = Blueprint('videos', __name__)


@video_routes.route('/<int:profileId>')
@login_required
def load_videos(profileId):

    videos = Video.query.order_by(Video.id).all()
    profile = Profile.query.filter(Profile.id == profileId).first()


    return {"videos":[video.to_dict() for video in videos ], "profile": profile.to_dict()}
