# Ika-Research-App
This is a research web application that provides Automatic Speech Recognition service to Nigerians.
It supports various Nigerian languages including Igbo, Yoruba, Hausa, Ika etc

## Repo Structure

speech-app/
├── docker-compose.yml
├── .env
├── README.md
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── index.html
│       ├── styles.css
│       ├── app.js
│       ├── language.js
│       ├── audioUpload.js
│       ├── contribute.js
│       ├── auth.js
│       └── components/
│           ├── header.html
│           ├── footer.html
│           ├── home.html
│           ├── test_use.html
│           └── contribute.html
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── app.py
│       ├── config.py
│       ├── models.py
│       ├── auth.py
│       ├── preprocess.py
│       ├── inference.py
│       ├── s3_utils.py
│       ├── sagemaker_integration.py
│       └── routes/
│           ├── api.py
│           └── auth_routes.py
├── db/
│   ├── Dockerfile
│   └── init.sql
└── tests/
    ├── frontend/
    └── backend/
        └── test_app.py
        