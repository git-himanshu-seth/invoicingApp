# Backend template

Node, Express and MongoDB APP Template

## Running Project in Local

1. Install dependencies using inside client folder `npm i or npm install`

2. Create .env file in root directory and add following configurations inside client folder :

```
NODE_ENV= development
DB_URI= mongodb://localhost:27017/<db_name>
SERVER_PORT= <port_number>
API_PREFIX= /<api_prefix>

```

3. Start application using inside client folder `npm run dev`

## Running Project in Production

1. Set environment variables for the following configurations inside client folder:

```
DB_URI= <mongodb_uri>
SERVER_PORT= <port_number>
API_PREFIX= /<api_prefix>

```

2. Install dependencies using inside server folder `npm i --omit=dev`

3. Start application using inside server folder `npm start`

# Frontend template

React + Vite, Axios and more

## Running Project in Local

1. Install dependencies using inside client folder `npm i or npm install`

2. Create .env file in root directory and add following configurations:

```
VITE_API_URL=http://localhost:8080/<api_prefix>

```

3. Start application using inside client folder `npm run dev`

## Build the project

1. Run npm build command inside client folder

2. Upload build folder to server
