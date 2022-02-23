from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required
from app.forms.add_lists_form import AddListForm
from app.models import List, Profile, Video, db


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
    print("FROM THE LIST API", id)
    data = request.json
    title = data['title']
    profile_id = data['profile_id']
    print("API ROUTE !!!!!!", title, profile_id)

    newList = List(title=title, profile_id=profile_id)

    db.session.add(newList)
    db.session.commit()
    return jsonify([newList.to_dict()])

    # return make_response({'errors': 'Error(s) on creating new list.'})


# EDIT ROUTE HERE
@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_list(id):
    object = request.json
    print("")
    title = object["title"]
    # profile_id = object['profile_id']

    # print("USERS ID???????????", title, profile_id)

    currentList = List.query.get(id)
    print("FROM EDIT LIST API", currentList)
    currentList.title = title

    # db.session.add(currentList)
    db.session.commit()

    profileLists = List.query.filter(List.profile_id == id).all()

    return jsonify([list.to_dict() for list in profileLists])



@list_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_list(id):
    print("IN LIST DELETE API !!!!!!!!", id)

    currentList = List.query.get(id)
    print("FROM DELETE ROUTE LIST", currentList)
    db.session.delete(currentList)
    db.session.commit()

    profileLists = List.query.filter(List.profile_id == Profile.id)

    return jsonify([list.to_dict() for list in profileLists])
