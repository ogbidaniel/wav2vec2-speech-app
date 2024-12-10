# run.py

from app import app, db
from models import Language

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        # Seed the database with some languages if not already present
        if Language.query.count() == 0:
            languages = [
                {'code': 'yo', 'name': 'Yoruba'},
                {'code': 'ig', 'name': 'Igbo'},
                {'code': 'ha', 'name': 'Hausa'}
            ]
            for lang in languages:
                language = Language(code=lang['code'], name=lang['name'])
                db.session.add(language)
            db.session.commit()

    app.run(debug=True)
