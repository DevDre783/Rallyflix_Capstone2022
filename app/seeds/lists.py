from app.models import db, List


def seed_lists():

    list1 = List(title="My List", profile_id=1, video_id=22)
    list2 = List(title="Best of 2021", profile_id=1, video_id=16)
    list3 = List(title="Love Rally!", profile_id=2, video_id=16)

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)

    db.session.commit()


def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
