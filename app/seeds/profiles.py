from app.models import db, Profile

def seed_profiles():
    profile_1 = Profile(user_id=1, name="Andres")

    profile_2 = Profile(user_id=1, name="Dan")

    profile_3 = Profile(user_id=1, name="Jerry")


    db.session.add(profile_1)
    db.session.add(profile_2)
    db.session.add(profile_3)

    db.session.commit()


def undo_profiles():
    db.session.execute('TRUNCATE profiles RESTART IDENTITY CASCADE;')
    db.session.commit()
