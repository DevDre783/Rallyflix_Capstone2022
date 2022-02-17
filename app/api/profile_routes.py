from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Profile, User, db

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('/')
@login_required
def profiles():
    user_profiles = Profile.query.order_by(Profile.id).all()
    users = User.query.all()
    # print("???????????", profiles)
    return {'profiles': [profile.to_dict() for profile in user_profiles], 'users': [user.to_dict() for user in users]}
