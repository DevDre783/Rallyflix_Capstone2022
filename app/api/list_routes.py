from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import List, db


list_routes = Blueprint('lists', __name__)


@list_routes.route('/')
@login_required
def profile_lists():
    lists = List.query.order_by(List.id).filter().all()
    return {'lists': [list.to_dict() for list in lists ]}
