from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required
from app.models import Profile, User, db
from app.forms import AddProfileForm

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('/<int:user_id>')
@login_required
def load_user_profiles(user_id):
    user_profiles = Profile.query.order_by(Profile.id).filter(Profile.user_id == user_id).all()

    # print("???????????", user_profiles)
    return jsonify([profile.to_dict() for profile in user_profiles])


# @profile_routes.route('/add-profile', methods=['POST'])
# @login_required
# def add_profile():
#     data = request.json
#     form = AddProfileForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         profile = Profile(
#             user_id=data["user_id"],
#             name=data['name']
#         )

#         db.session.add(profile)
#         db.session.commit()

#         return jsonify(profile.to_dict())

#     return make_response({'errors': 'Error(s) on creating new profile.'})
