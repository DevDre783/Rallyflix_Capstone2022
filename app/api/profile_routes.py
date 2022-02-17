from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Profile, User, db

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('/<int:user_id>')
@login_required
def profiles(user_id):
    user_profiles = Profile.query.order_by(Profile.id).filter(Profile.user_id == user_id).all()

    print("???????????", user_profiles)
    return {'profiles': [profile.to_dict() for profile in user_profiles]}

# @profile_routes.route("/<int:user_id>")
# def load_user_profile(user_id):
#     user_profile = Profile.query.filter(Profile.user_id == user_id).all()
#     return jsonify([portfolio.to_dict() for portfolio in user_portfolios])
