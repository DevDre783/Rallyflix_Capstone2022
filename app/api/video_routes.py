from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Video, Profile, User, db

video_routes = Blueprint('videos', __name__)


@video_routes.route('/<int:id>')
@login_required
def load_videos(id):
    # print(id)
    videos = Video.query.order_by(Video.id).all()
    # currentProfile = Profile.query.get(id)
    # print("CURRENT USER!!", currentUser.id)

    # profile = Profile.query.filter(Profile.id == id).first()
    # print("API ROUTE VIDEOS!!!!!!", {videos[0]})
    # print("API ROUTE VIDEOS!!!!!!", profile.to_dict())


    # return "Successful !!!!"
    return jsonify([video.to_dict() for video in videos])
