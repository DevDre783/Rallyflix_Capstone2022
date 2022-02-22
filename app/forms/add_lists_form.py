from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import List


class AddListForm(FlaskForm):
    name = StringField("List name", validators=[DataRequired()])
