from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import List, db


list_routes = Blueprint('lists', __name__)


@list_routes.route('/<int:profile_id>')
@login_required
def profile_lists(profile_id):
    lists = List.query.order_by(List.id).filter(List.profile_id == profile_id).all()
    return {'lists': [list.to_dict() for list in lists ]}
