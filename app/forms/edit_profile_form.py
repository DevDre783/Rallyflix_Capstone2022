from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Profile


class EditProfileForm(FlaskForm):
    name = StringField("Profile name", validators=[DataRequired()])
