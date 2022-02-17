from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Profile


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# getting profiles belonging to a user
@user_routes.route('/<int:id>/profiles')
@login_required
def user_profiles(id):
    user = User.query.get(id)
    profiles = Profile.query.filter(Profile.user_id == id).all()
    return {'user': user.to_dict(), 'profiles': [profile.to_dict() for profile in profiles]}
