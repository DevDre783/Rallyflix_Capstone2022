from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required
from app.models import List, Profile, Video, db
from app.forms import add_lists_form


list_routes = Blueprint('lists', __name__)


@list_routes.route('/<int:id>')
@login_required
def profile_lists(id):
    lists = List.query.filter(List.profile_id == id).all()

    profile = Profile.query.filter(Profile.id == id).first()

    # return "Successful !!!!"
    return jsonify([list.to_dict() for list in lists], profile.to_dict())


@list_routes.route('/<int:id>', methods=['POST'])
@login_required
def add_list(id):
    data = request.json
    print("NEW PROFILE BACKEND????", data)
    form = data
    form['csrf_token'] = request.cookies['csrf_token']

    if form.validate_on_submit():
        list = List(
            video_id=data['video_id'],
            title=data['title']
        )

        db.session.add(list)
        db.session.commit()

        return jsonify(list.to_dict())

    return make_response({'errors': 'Error(s) on creating new list.'})


# # EDIT ROUTE HERE
# @profile_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_profile(id):
#     object = request.json
#     name = object["newName"]
#     user_id = object["user_id"]

#     print("USERS ID???????????", name, user_id)

#     currentProfile = Profile.query.get(id)
#     currentProfile.name = name

#     db.session.add(currentProfile)
#     db.session.commit()

#     userProfiles = Profile.query.filter(Profile.user_id == user_id).all()

#     return jsonify([profile.to_dict() for profile in userProfiles])



# @profile_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
# def delete_profile(id):
#     print("IN PROFILE API !!!!!!!!!!!!!!!!!!!!!")
#     object = request.json
#     user_id = object["user_id"]
#     print("USERS ID???????????", user_id)
#     currentProfile = Profile.query.get(id)
#     db.session.delete(currentProfile)
#     db.session.commit()

#     userProfiles = Profile.query.filter(Profile.user_id == user_id).all()

#     return jsonify([profile.to_dict() for profile in userProfiles])
